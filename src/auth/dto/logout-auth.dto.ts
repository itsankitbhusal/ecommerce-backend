import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LogoutAuthDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  uuid: string;
}
