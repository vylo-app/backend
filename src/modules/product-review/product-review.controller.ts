import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { CreateProductReviewDto } from '../../../shared-contract/dto/product/create-product-review.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUserId } from 'src/common/decorators/CurrentUserId.decorator';

@Controller('product-reviews')
@UseGuards(JwtAuthGuard)
export class ProductReviewController {
  constructor(private readonly service: ProductReviewService) {}

  @Post()
  async create(
    @CurrentUserId() userId: string,
    @Body() dto: CreateProductReviewDto,
  ) {
    return this.service.create(userId, dto);
  }

  @Get(':productId')
  async getAll(
    @CurrentUserId() currentUserId: string,
    @Param('productId') productId: string,
  ) {
    return this.service.getAllForProduct(currentUserId, productId);
  }

  @Delete(':reviewId')
  async delete(
    @CurrentUserId() currentUserId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return this.service.delete(currentUserId, reviewId);
  }
}
