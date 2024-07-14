import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  // @IsNumber()
  // @ApiProperty({ required: true })
  // order_no: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  product_id: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  shipping_email: string;

  @IsPhoneNumber()
  @ApiProperty({ required: true })
  shipping_phone: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  shipping_address: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  order_payment_method: string;

  // @ApiProperty({ required: false })
  // cart_items: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  items_price: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  delivery_charge: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  total_price: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  status: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ required: true })
  payment_date: Date;
}
