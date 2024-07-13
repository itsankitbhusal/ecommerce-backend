import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PayloadAuthDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  access_token: string;
}
