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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDTO } from './dto/product-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { TokenGuard } from 'src/token/token.guard';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(TokenGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const data = await this.productsService.create(createProductDto);
    return plainToInstance(ProductResponseDTO, data);
  }

  @Get()
  async findAll() {
    const data = await this.productsService.findAll();
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

  @UseGuards(TokenGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const data = await this.productsService.update(id, updateProductDto);
    return plainToInstance(ProductResponseDTO, data);
  }

  @UseGuards(TokenGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.productsService.remove(id);
    if (data) {
      return 'Data deleted';
    }
  }
}
