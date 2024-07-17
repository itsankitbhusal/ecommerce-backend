import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReviewResponseDTO {
  @Expose()
  uuid: string;

  @Expose()
  user_id: string;

  @Expose()
  product_id: string;

  @Expose()
  review: string;

  @Expose()
  rating: string;

  @Expose()
  status: string;
}
