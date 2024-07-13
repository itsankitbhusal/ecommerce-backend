import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  refreshToken: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  uuid: string;
}
