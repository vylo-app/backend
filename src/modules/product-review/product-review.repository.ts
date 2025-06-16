import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductReviewDto } from '../../../shared-contract/dto/product/create-product-review.dto';

@Injectable()
export class ProductReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createReview(userId: string, dto: CreateProductReviewDto) {
    return this.prisma.productReview.create({
      data: {
        rating: dto.rating,
        feedback: dto.feedback,
        productId: dto.productId,
        userId,
      },
      include: {
        user: {
          select: { firstName: true, lastName: true },
        },
      },
    });
  }

  async findAllByProductId(productId: string) {
    return this.prisma.productReview.findMany({
      where: { productId, removedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { firstName: true, lastName: true },
        },
      },
    });
  }

  async findById(reviewId: string) {
    return this.prisma.productReview.findUnique({
      where: { id: reviewId },
    });
  }

  async softDelete(reviewId: string) {
    return this.prisma.productReview.update({
      where: { id: reviewId },
      data: { removedAt: new Date() },
    });
  }
}
