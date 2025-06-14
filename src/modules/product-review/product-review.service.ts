import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductReviewDto } from '../../../shared-contract/dto/product/create-product-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProductReviewDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    return this.prisma.productReview.create({
      data: {
        rating: dto.rating,
        feedback: dto.feedback,
        productId: dto.productId,
        userId,
      },
    });
  }

  async getAllForProduct(productId: string) {
    return this.prisma.productReview.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { firstName: true, lastName: true } },
      },
    });
  }
}
