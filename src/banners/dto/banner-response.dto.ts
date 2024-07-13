import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BannerResponse {
  @Expose()
  uuid: string;

  @Expose()
  product_id: string;

  @Expose()
  banner_type: string;

  @Expose()
  url: string;

  @Expose()
  is_published: boolean;
}
