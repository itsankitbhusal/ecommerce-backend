import { ApiProperty } from '@nestjs/swagger';
import { categories } from '@prisma/client';

export class Category implements categories {
  id: number;
  @ApiProperty()
  category_name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  uuid: string;
}
