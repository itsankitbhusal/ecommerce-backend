import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OTPAuthDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  uuid: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  otp: string;
}
