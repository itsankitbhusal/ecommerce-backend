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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CategoryResponseDto } from './dto/category-response.dto';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const data = this.categoriesService.create(createCategoryDto);
    return plainToInstance(CategoryResponseDto, data);
  }

  @Get()
  findAll() {
    const data = this.categoriesService.findAll();
    return plainToInstance(CategoryResponseDto, data);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = this.categoriesService.findOne(id);
    return plainToInstance(CategoryResponseDto, data);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const data = this.categoriesService.update(id, updateCategoryDto);
    return plainToInstance(CategoryResponseDto, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = this.categoriesService.remove(id);
    if (data) {
      return 'Data deleted!';
    }
  }
}
