import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @ApiProperty({ required: true })
  order_no: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  product_id: string;

  @IsEmail()
  @ApiProperty({ required: true })
  shipping_email: string;

  @IsPhoneNumber()
  @ApiProperty({ required: true })
  shipping_phone: string;

  @ApiProperty({ required: true })
  shipping_address: string;

  @ApiProperty({ required: true })
  order_payment_method: string;

  @ApiProperty({ required: false })
  cart_items: number;

  @ApiProperty({ required: true })
  items_price: string;

  @ApiProperty({ required: true })
  delivery_charge: string;

  @ApiProperty({ required: true })
  total_price: string;

  @ApiProperty({ required: true })
  status: string;

  @IsDateString()
  @ApiProperty({ required: true })
  payment_date: Date;
}
