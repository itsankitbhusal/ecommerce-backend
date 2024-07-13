import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OrderResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  order_no: string;

  @Expose()
  user_id: string;

  @Expose()
  product_id: string;

  @Expose()
  shipping_email: string;

  @Expose()
  shipping_phone: string;

  @Expose()
  shipping_address: string;

  @Expose()
  order_payment_method: string;

  @Expose()
  items_price: string;

  @Expose()
  delivery_charge: string;

  @Expose()
  total_price: string;

  @Expose()
  status: string;

  @Expose()
  payment_date: Date;
}
