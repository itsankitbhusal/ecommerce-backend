import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ required: true })
  category_id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ required: true })
  product_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ required: true })
  product_description: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ required: true })
  product_image: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ required: true })
  product_price: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ required: true })
  product_status: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ required: true })
  product_features: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  inventory_count: number;

  @IsArray()
  @ApiProperty()
  other_images: string[];

  @IsDateString()
  @MinLength(2)
  @ApiProperty()
  product_date: Date;
}
