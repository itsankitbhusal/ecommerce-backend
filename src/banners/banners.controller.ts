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
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { plainToInstance } from 'class-transformer';
import { BannerResponse } from './dto/banner-response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('banners')
@ApiTags('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  async create(@Body() createBannerDto: CreateBannerDto) {
    const data = await this.bannersService.create(createBannerDto);
    return plainToInstance(BannerResponse, data);
  }

  @Get()
  async findAll() {
    const data = await this.bannersService.findAll();
    return plainToInstance(BannerResponse, data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.bannersService.findOne(id);
    return plainToInstance(BannerResponse, data);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    const data = await this.bannersService.update(id, updateBannerDto);
    return plainToInstance(BannerResponse, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.bannersService.remove(id);
    if (data) {
      return 'Banner deleted';
    }
  }
}
