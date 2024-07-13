import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBannerDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  banner_type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  url: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  is_published: boolean;
}
