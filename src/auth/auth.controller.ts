import { Controller, Get, Post, Body, Patch, Req } from '@nestjs/common';

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
    const data = this.authService.signup(createAuthDto);

    return plainToInstance(CreateAuthResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
  @Post('/login')
  login(@Body() signinAuthDto: SigninAuthDto) {
    const data = this.authService.login(signinAuthDto);
    return plainToInstance(LoginAuthResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @Get('/logout')
  @ApiHeader({
    name: 'refreshtoken',
    required: true,
    description: 'Refresh Token',
  })
  async logout(@Req() req: CustomRequest) {
    const refreshToken = req.headers['refreshtoken'];
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
  @ApiHeader({
    name: 'refreshtoken',
    required: true,
    description: 'Refresh Token',
  })
  async refreshToken(@Req() req: CustomRequest) {
    const refreshToken = req.headers['refreshtoken'];
    if (refreshToken) {
      return await this.authService.refreshToken(refreshToken);
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('payload')
  async getPayload(@Body() dto: PayloadAuthDto) {
    const payload = this.authService.getPayload(dto.access_token);

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
