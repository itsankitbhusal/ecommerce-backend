import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}
  create(createReviewDto: CreateReviewDto) {
    return this.prisma.reviews.create({ data: createReviewDto });
  }

  findAll() {
    return this.prisma.reviews.findMany();
  }

  findOne(uuid: string) {
    return this.prisma.reviews.findUnique({ where: { uuid: uuid } });
  }

  update(uuid: string, updateReviewDto: UpdateReviewDto) {
    return this.prisma.reviews.update({
      where: { uuid: uuid },
      data: updateReviewDto,
    });
  }

  remove(uuid: string) {
    return this.prisma.reviews.delete({ where: { uuid: uuid } });
  }
}
