import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BannersService {
  constructor(private prisma: PrismaService) {}

  create(createBannerDto: CreateBannerDto) {
    return this.prisma.banners.create({ data: createBannerDto });
  }

  findAll() {
    return this.prisma.banners.findMany();
  }

  findOne(id: string) {
    return this.prisma.banners.findUnique({ where: { uuid: id } });
  }

  update(id: string, updateBannerDto: UpdateBannerDto) {
    return this.prisma.banners.update({
      where: { uuid: id },
      data: updateBannerDto,
    });
  }

  remove(id: string) {
    return this.prisma.banners.delete({ where: { uuid: id } });
  }
}
