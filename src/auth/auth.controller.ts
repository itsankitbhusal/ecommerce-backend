import { Controller, Get, Post, Body, Patch, Req, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OTPAuthDto } from './dto/otp-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { OtpPasswordDto } from './dto/otp-password.dto';
import { PasswordAuthDto } from './dto/password-auth.dto';
import { PayloadAuthDto } from './dto/payload-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';

interface CustomRequest extends Request {
  refreshToken?: string;
  uuid?: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto);
  }
  @Post('/login')
  login(@Body() signinAuthDto: SigninAuthDto) {
    return this.authService.login(signinAuthDto);
  }

  @Get('/logout')
  @ApiBody({ type: LogoutAuthDto })
  async logout(@Req() req: CustomRequest) {
    if (req.uuid) {
      return await this.authService.logout(req.uuid);
    }
  }

  @Post('/verify')
  async verify(@Body() dto: OTPAuthDto, @Res() res: Response) {
    const isValid = await this.authService.verifyUser(dto);
    if (isValid) {
      res.status(200).send({
        message: 'Verified',
      });
    } else {
      // Optionally, you can also set a different status code for invalid cases
      res.status(400).send({ error: 'Invalid verification' });
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
  @ApiBody({ type: RefreshTokenDto })
  async refreshToken(@Req() req: CustomRequest) {
    const { uuid, refreshToken } = req;
    if (uuid && refreshToken) {
      return await this.authService.refreshToken(uuid, refreshToken);
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('payload')
  async getPayload(@Body() dto: PayloadAuthDto) {
    return this.authService.getPayload(dto.access_token);
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
