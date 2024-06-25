import { users } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements users {
  @ApiProperty()
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email_verified: boolean;

  created_at: Date;
  updated_at: Date;
}
