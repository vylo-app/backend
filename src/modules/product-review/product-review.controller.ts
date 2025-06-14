import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { CreateProductReviewDto } from '../../../shared-contract/dto/product/create-product-review.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('product-reviews')
export class ProductReviewController {
  constructor(private readonly service: ProductReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() dto: CreateProductReviewDto) {
    return this.service.create(req.user.id, dto);
  }

  @Get(':productId')
  async getAll(@Param('productId') productId: string) {
    return this.service.getAllForProduct(productId);
  }
}
