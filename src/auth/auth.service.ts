import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilService } from 'src/utils/util.service';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { OTPAuthDto } from './dto/otp-auth.dto';
import * as argon from 'argon2';
import { CreateAuthDto } from './dto/create-auth.dto';
import { unverifiedUserType } from './Types/user.types';
import { PasswordAuthDto } from './dto/password-auth.dto';
import { OtpPasswordDto } from './dto/otp-password.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private utility: UtilService,
    private mailer: MailService,
    private config: ConfigService,
  ) {}

  async updateRtHash(uuid: string, rt: string) {
    const hash = await this.utility.hashData(rt);
    await this.prisma.users.update({
      where: {
        uuid: uuid,
      },
      data: {
        hashRT: hash,
      },
    });
  }

  async updateOtp(uuid: string) {
    const otp = await this.utility.generateOtp();
    const hashedOtp = await this.utility.hashData(String(otp));
    const user = await this.prisma.unverified_users.update({
      where: {
        uuid: uuid,
      },
      data: {
        otp: hashedOtp,
      },
    });
    delete user.otp;
    return { ...user, otp: String(otp) };
  }

  async verifyUser(otpAuthDto: OTPAuthDto) {
    const user = await this.prisma.unverified_users.findUnique({
      where: {
        uuid: otpAuthDto.uuid,
      },
    });

    if (!user) return false;

    const otpMatch = await argon.verify(user.otp, otpAuthDto.otp);

    if (otpMatch) {
      delete user.otp;
      delete user.id;
      delete user.uuid;

      const newUser = await this.prisma.users.create({
        data: { ...user },
      });

      await this.prisma.unverified_users.delete({
        where: {
          email: user.email,
        },
      });

      if (newUser) {
        return true;
      } else {
        return false;
      }
    }
  }

  async changePassword(dto: PasswordAuthDto) {
    try {
      await this.prisma.password_otp.delete({
        where: {
          user_mail: dto.email,
        },
      });
    } catch (err) {
      console.log('deletion error: ', err);
    }

    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const otp = String(await this.utility.generateOtp());
    const hashOtp = await this.utility.hashData(otp);
    // create a reln table to store user vs otp
    await this.mailer.sendUserConfirmation(user.email, user.name, otp);

    const newPassOtp = await this.prisma.password_otp.create({
      data: {
        user_mail: dto.email,
        hashOtp,
      },
    });

    if (!newPassOtp)
      if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return {
      message: 'Email Sent',
    };
  }

  async verifyPasswordChange(dto: OtpPasswordDto) {
    console.log('dto: ', dto);
    const passOtp = await this.prisma.password_otp.findUnique({
      where: {
        user_mail: dto.email,
      },
    });
    const isOtp = await argon.verify(passOtp.hashOtp, dto.otp);

    if (!isOtp)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    const password = await argon.hash(dto.password);
    const oldPassword = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (oldPassword.password === password) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user = await this.prisma.users.update({
      where: {
        email: dto.email,
      },
      data: {
        password,
      },
    });
    if (!user)
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    await this.prisma.password_otp.delete({
      where: {
        uuid: passOtp.uuid,
      },
    });
  }

  async login(dto: SigninAuthDto) {
    // find if user is not verified
    const notVerifiedUser = await this.prisma.unverified_users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (notVerifiedUser) {
      return {
        ...notVerifiedUser,
        verified: false,
        access_token: null,
        refresh_token: null,
      };
    }

    // find user and if not present throw error
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    // verify user's password
    const isUser = await argon.verify(user.password, dto.password);
    if (!isUser) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const accessToken = await this.utility.getAccessToken(
      user.uuid,
      user.email,
      user.role,
    );
    const refreshToken = await this.utility.getRefreshToken(
      user.uuid,
      user.email,
      user.role,
    );

    await this.updateRtHash(user.uuid, refreshToken);
    return { access_token: accessToken, refresh_token: refreshToken, ...user };
  }

  async signup(dto: CreateAuthDto) {
    let user: unverifiedUserType, otp: string;
    // if user already exist in as verified user
    const preExist = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (preExist) throw new HttpException('Already Exist', HttpStatus.CONFLICT);
    const reSend = await this.prisma.unverified_users.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (reSend) {
      user = await this.updateOtp(reSend.uuid);
      otp = user.otp;
    } else {
      const hash = await this.utility.hashData(dto.password);
      otp = String(await this.utility.generateOtp());
      const hashedOtp = await this.utility.hashData(String(otp));
      user = await this.prisma.unverified_users.create({
        data: {
          email: dto.email,
          password: hash,
          name: dto.name,
          otp: hashedOtp,
        },
      });
      await this.mailer.sendUserConfirmation(user.email, user.name, otp);
      return user;
    }
  }
  async logout(rt: string) {
    const refreshTokenPayload = await this.utility.getPayloadRefresh(rt);

    await this.prisma.users.updateMany({
      where: {
        uuid: refreshTokenPayload.uuid,
        hashRT: {
          not: null,
        },
      },
      data: {
        hashRT: null,
      },
    });
  }

  async refreshToken(rt: string) {
    const refreshTokenPayload = await this.utility.getPayloadRefresh(rt);

    const user = await this.prisma.users.findUnique({
      where: {
        email: refreshTokenPayload.email,
        uuid: refreshTokenPayload.uuid,
      },
    });
    const Validity = await argon.verify(user.hashRT, rt);
    if (!user)
      throw new HttpException('Unauthorized1', HttpStatus.UNAUTHORIZED);

    if (!Validity)
      throw new HttpException('Unauthorized2', HttpStatus.UNAUTHORIZED);

    const accessToken = await this.utility.getAccessToken(
      user.uuid,
      user.email,
      user.role,
    );
    return accessToken;
  }

  async getPayload(access_token: string) {
    return this.utility.getPayload(access_token);
  }
}
