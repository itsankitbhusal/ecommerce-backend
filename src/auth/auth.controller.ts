import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import {
  OTPAuthDto,
  OtpPasswordDto,
  PasswordAuthDto,
  SigninAuthDto,
} from './dto/otp-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateAuthDto } from './dto/create-auth.dto';

interface CustomRequest extends Request {
  user?: {
    refreshToken: string;
    uuid: string;
  };
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
  async logout(@Req() req: CustomRequest) {
    if (req.user.uuid) {
      return await this.authService.logout(req.user.uuid);
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
  async refreshToken(@Req() req: CustomRequest) {
    const user = req.user;
    if (user) {
      return await this.authService.refreshToken(user.uuid, user.refreshToken);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('payload')
  async getPayload(@Body() dto: { access_token: string }) {
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
