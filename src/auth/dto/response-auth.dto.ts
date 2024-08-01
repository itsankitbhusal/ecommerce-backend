import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateAuthResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;
}

export class LoginAuthResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  verified?: boolean;

  @Expose()
  email: string;

  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;
}

export class PayloadResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  email: string;
}
