import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDTO } from './dto/product-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    const data = this.productsService.create(createProductDto);
    return plainToInstance(ProductResponseDTO, data);
  }

  @Get()
  findAll() {
    const data = this.productsService.findAll();
    return plainToInstance(ProductResponseDTO, data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const data = await this.productsService.findOne(id);
      if (data === null) {
        return 'Product not found!';
      }
      return plainToInstance(ProductResponseDTO, data);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const data = this.productsService.update(id, updateProductDto);
    return plainToInstance(ProductResponseDTO, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = this.productsService.remove(id);
    if (data) {
      return 'Data deleted';
    }
    console.log('data: ', data);
  }
}
