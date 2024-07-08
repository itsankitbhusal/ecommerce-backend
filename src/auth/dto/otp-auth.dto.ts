import { IsEmail, IsNotEmpty } from 'class-validator';

export class OTPAuthDto {
  @IsNotEmpty()
  uuid: string;

  @IsNotEmpty()
  otp: string;
}

export class OtpPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  otp: string;
}

export class PasswordAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class SignupAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;
}

export class SigninAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
