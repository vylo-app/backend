import { Module } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { ProductReviewController } from './product-review.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductReviewRepository } from './product-review.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProductReviewController],
  providers: [ProductReviewService, ProductReviewRepository],
})
export class ProductReviewModule {}
