import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
export class CreateReviewDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ required: true })
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ required: true })
  product_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  review: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  rating: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  status: string;
}
