import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { OTPAuthDto } from './dto/otp-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { OtpPasswordDto } from './dto/otp-password.dto';
import { PasswordAuthDto } from './dto/password-auth.dto';
import { PayloadAuthDto } from './dto/payload-auth.dto';
import { plainToInstance } from 'class-transformer';
import {
  CreateAuthResponseDto,
  LoginAuthResponseDto,
  PayloadResponseDto,
} from './dto/response-auth.dto';
import { Response } from 'express';

export interface CustomRequest extends Request {
  cookies: { [key: string]: string };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createAuthDto: CreateAuthDto) {
    const data = this.authService.signup(createAuthDto);

    return plainToInstance(CreateAuthResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
  @Post('/login')
  async login(
    @Body() signinAuthDto: SigninAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(signinAuthDto);
    res.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict',
    });
    res.cookie('refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict',
    });
    // res.status(HttpStatus.OK).json({
    //   user: {
    //     uuid: data.uuid,
    //     email: data.email,
    //     name: data.name,
    //   },
    // });
    const resData = plainToInstance(LoginAuthResponseDto, data, {
      excludeExtraneousValues: true,
    });

    return resData;
  }

  @Get('/logout')
  async logout(@Req() req: CustomRequest) {
    const refreshToken = req.cookies['refresh_token'];
    return await this.authService.logout(refreshToken);
  }

  @Post('/verify')
  async verify(@Body() dto: OTPAuthDto) {
    const isValid = await this.authService.verifyUser(dto);
    if (isValid) {
      return {
        message: 'Verified',
      };
    } else {
      // Optionally, you can also set a different status code for invalid cases
      return {
        error: 'Invalid verification',
      };
    }
  }

  @Patch('/password')
  async verifyPasswordChange(@Body() dto: OtpPasswordDto) {
    await this.authService.verifyPasswordChange(dto);
    return {
      message: 'Changed Successfully',
    };
  }

  @Post('/password/otp')
  async changePassword(@Body() dto: PasswordAuthDto) {
    return this.authService.changePassword(dto);
  }

  @Get('/refresh')
  async refreshToken(
    @Req() req: CustomRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    if (refreshToken) {
      const accessToken = await this.authService.refreshToken(refreshToken);
      if (accessToken) {
        res.cookie('access_token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'prod',
          sameSite: 'strict',
        });

        return accessToken;
      }
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('payload')
  async getPayload(@Req() req: CustomRequest) {
    const accessToken = req.cookies['access_token'];
    const payload = this.authService.getPayload(accessToken);

    return plainToInstance(PayloadResponseDto, payload);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
