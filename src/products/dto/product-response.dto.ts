import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProductResponseDTO {
  @Expose()
  uuid: string;

  @Expose()
  category_id: string;

  @Expose()
  product_name: string;

  @Expose()
  product_description: string;

  @Expose()
  product_image: string;

  @Expose()
  product_price: string;

  @Expose()
  product_status: string;

  @Expose()
  product_features: string;

  @Expose()
  other_images: string;

  @Expose()
  product_date: Date;
}
