import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CategoryResponseDto {
  @Expose()
  category_name: string;

  @Expose()
  uuid: string;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;
}
