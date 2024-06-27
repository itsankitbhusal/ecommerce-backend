import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    console.log('create category dto: ', createCategoryDto);
    return this.prisma.categories.create({ data: createCategoryDto });
  }

  findAll() {
    return this.prisma.categories.findMany();
  }

  findOne(uuid: string) {
    return this.prisma.categories.findUnique({ where: { uuid: uuid } });
  }

  update(uuid: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.categories.update({
      where: { uuid: uuid },
      data: updateCategoryDto,
    });
  }

  remove(uuid: string) {
    return this.prisma.categories.delete({ where: { uuid: uuid } });
  }
}
