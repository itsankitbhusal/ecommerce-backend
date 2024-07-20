import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { plainToInstance } from 'class-transformer';
import { OrderResponseDto } from './dto/orders-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/token/token.guard';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(TokenGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const data = await this.ordersService.create(createOrderDto);
    return plainToInstance(OrderResponseDto, data);
  }

  @UseGuards(TokenGuard)
  @Get()
  async findAll() {
    const data = await this.ordersService.findAll();
    return plainToInstance(OrderResponseDto, data);
  }

  @UseGuards(TokenGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.ordersService.findOne(id);
    return plainToInstance(OrderResponseDto, data);
  }

  @UseGuards(TokenGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const data = await this.ordersService.update(id, updateOrderDto);
    return plainToInstance(OrderResponseDto, data);
  }

  @UseGuards(TokenGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.ordersService.remove(id);
    if (data) {
      return 'Data deleted!';
    }
  }
}
