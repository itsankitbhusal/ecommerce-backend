import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return this.prisma.products.create({ data: createProductDto });
  }

  findAll() {
    return this.prisma.products.findMany();
  }

  findOne(id: string) {
    try {
      return this.prisma.products.findUnique({ where: { uuid: id } });
    } catch (error) {
      console.error(error);
    }
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.products.update({
      where: { uuid: id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prisma.products.delete({ where: { uuid: id } });
  }
}
