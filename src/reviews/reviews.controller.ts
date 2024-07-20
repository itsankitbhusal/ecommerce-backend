import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ReviewResponseDTO } from './dto/review-response.dto';
import { TokenGuard } from 'src/token/token.guard';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(TokenGuard)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    const data = await this.reviewsService.create(createReviewDto);
    return plainToInstance(ReviewResponseDTO, data);
  }

  @UseGuards(TokenGuard)
  @Get()
  async findAll() {
    const data = await this.reviewsService.findAll();
    return plainToInstance(ReviewResponseDTO, data);
  }

  @UseGuards(TokenGuard)
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const data = await this.reviewsService.findOne(uuid);
    return plainToInstance(ReviewResponseDTO, data);
  }

  @UseGuards(TokenGuard)
  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const data = await this.reviewsService.update(uuid, updateReviewDto);
    return plainToInstance(ReviewResponseDTO, data);
  }

  @UseGuards(TokenGuard)
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    const data = await this.reviewsService.remove(uuid);
    if (data) {
      return 'Data deleted';
    }
  }
}
