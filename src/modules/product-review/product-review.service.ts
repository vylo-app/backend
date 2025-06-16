import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductReviewDto } from '../../../shared-contract/dto/product/create-product-review.dto';
import { ProductReviewRepository } from './product-review.repository';

@Injectable()
export class ProductReviewService {
  constructor(private readonly repo: ProductReviewRepository) {}

  async create(userId: string, dto: CreateProductReviewDto) {
    const product = await this.repo.findProductById(dto.productId);
    if (!product) throw new NotFoundException('Product not found');

    if (userId === product.ownerId) {
      throw new NotFoundException(
        'You cannot leave the review to your product',
      );
    }

    return this.repo.createReview(userId, dto);
  }

  async getAllForProduct(currentUserId: string, productId: string) {
    const reviews = await this.repo.findAllByProductId(productId);

    return reviews.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
      updatedAt: review.updatedAt.toISOString(),
      removedAt: review.removedAt ? review.removedAt.toISOString() : null,
      canDelete: review.userId === currentUserId,
    }));
  }

  async delete(userId: string, reviewId: string) {
    const review = await this.repo.findById(reviewId);
    if (!review) throw new NotFoundException('Review not found');

    if (review.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this review');
    }

    return this.repo.softDelete(reviewId);
  }
}
