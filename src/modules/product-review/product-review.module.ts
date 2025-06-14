import { Module } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { ProductReviewController } from './product-review.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductReviewController],
  providers: [ProductReviewService, PrismaService],
})
export class ProductReviewModule {}
