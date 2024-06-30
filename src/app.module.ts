import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { BannersModule } from './banners/banners.module';

@Module({
  imports: [PrismaModule, UsersModule, CategoriesModule, ProductsModule, BannersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
