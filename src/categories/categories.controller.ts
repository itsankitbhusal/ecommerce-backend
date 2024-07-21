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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CategoryResponseDto } from './dto/category-response.dto';
import { TokenGuard } from 'src/token/token.guard';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @UseGuards(TokenGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const data = await this.categoriesService.create(createCategoryDto);
    return plainToInstance(CategoryResponseDto, data);
  }

  @Get()
  async findAll() {
    const data = await this.categoriesService.findAll();
    return plainToInstance(CategoryResponseDto, data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.categoriesService.findOne(id);
    return plainToInstance(CategoryResponseDto, data);
  }

  @UseGuards(TokenGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const data = await this.categoriesService.update(id, updateCategoryDto);
    return plainToInstance(CategoryResponseDto, data);
  }

  @UseGuards(TokenGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.categoriesService.remove(id);
    if (data) {
      return 'Data deleted!';
    }
  }
}
