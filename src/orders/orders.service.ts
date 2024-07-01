import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  create(createOrderDto: CreateOrderDto) {
    return this.prisma.orders.create({ data: createOrderDto });
  }

  findAll() {
    return this.prisma.orders.findMany();
  }

  findOne(uuid: string) {
    return this.prisma.orders.findUnique({ where: { uuid: uuid } });
  }

  update(uuid: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.orders.update({
      where: { uuid: uuid },
      data: updateOrderDto,
    });
  }

  remove(uuid: string) {
    return this.prisma.orders.delete({ where: { uuid: uuid } });
  }
}
