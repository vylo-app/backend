import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../../../shared-contract/dto/product/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from '../../../shared-contract/dto/product/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findById(id: string, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new NotFoundException('Product not found');

    let isInCart = false;

    if (userId) {
      const order = await this.prisma.order.findFirst({
        where: { userId },
        include: {
          items: {
            where: { productId: id },
            select: { id: true },
          },
        },
      });

      isInCart = !!order?.items?.length;
    }

    return {
      ...product,
      isInCart,
    };
  }

  async create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
