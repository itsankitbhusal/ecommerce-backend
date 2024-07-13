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
  create(@Body() createBannerDto: CreateBannerDto) {
    const data = this.bannersService.create(createBannerDto);
    return plainToInstance(BannerResponse, data);
  }

  @Get()
  findAll() {
    const data = this.bannersService.findAll();
    return plainToInstance(BannerResponse, data);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = this.bannersService.findOne(id);
    return plainToInstance(BannerResponse, data);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    const data = this.bannersService.update(id, updateBannerDto);
    return plainToInstance(BannerResponse, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = this.bannersService.remove(id);
    if (data) {
      return 'Banner deleted';
    }
  }
}
