import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BannersController],
  providers: [BannersService],
  imports: [PrismaModule],
})
export class BannersModule {}
