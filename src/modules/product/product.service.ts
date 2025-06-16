import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../../../shared-contract/dto/product/create-product.dto';
import { UpdateProductDto } from '../../../shared-contract/dto/product/update-product.dto';
import { ProductRepository } from './product.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly prisma: PrismaService,
  ) {}

  findAll() {
    return this.productRepo.findAll();
  }

  async findById(id: string, userId: string) {
    const product = await this.productRepo.findById(id);

    if (!product) throw new NotFoundException('Product not found');

    let isInCart = false;

    if (userId) {
      const order = await this.prisma.orderItem.findFirst({
        where: {
          productId: id,
          order: { userId },
        },
        select: { id: true },
      });

      isInCart = !!order;
    }

    let canReview = false;

    if (userId && product.ownerId !== userId) {
      const hasAlreadyReviewed = await this.prisma.productReview.findFirst({
        where: {
          productId: id,
          userId,
        },
        select: { id: true },
      });

      canReview = !hasAlreadyReviewed;
    }

    return {
      ...product,
      isInCart,
      canReview,
    };
  }

  create(userId: string, dto: CreateProductDto) {
    return this.productRepo.create({
      name: dto.name,
      description: dto.description,
      owner: {
        connect: { id: userId },
      },
    });
  }

  update(id: string, dto: UpdateProductDto) {
    return this.productRepo.update(id, {
      name: dto.name,
      description: dto.description,
    });
  }

  delete(id: string) {
    return this.productRepo.delete(id);
  }
}
