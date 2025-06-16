import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUser(userId: string) {
    return this.prisma.favorite.findMany({
      where: {
        userId,
        removedAt: null,
        product: {
          removedAt: null,
        },
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async find(userId: string, productId: string) {
    return this.prisma.favorite.findFirst({
      where: {
        userId,
        productId,
        removedAt: null,
      },
    });
  }

  async findRaw(userId: string, productId: string) {
    return this.prisma.favorite.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });
  }

  async add(userId: string, productId: string) {
    const existing = await this.findRaw(userId, productId);

    if (existing && existing.removedAt === null) {
      throw new Error('Already in favorites');
    }

    if (existing && existing.removedAt !== null) {
      return this.prisma.favorite.update({
        where: { userId_productId: { userId, productId } },
        data: { removedAt: null },
      });
    }

    return this.prisma.favorite.create({
      data: { userId, productId },
    });
  }

  async remove(userId: string, productId: string) {
    return this.prisma.favorite.delete({
      where: {
        userId_productId: { userId, productId },
      },
    });
  }

  async softDelete(userId: string, productId: string) {
    return this.prisma.favorite.updateMany({
      where: {
        userId,
        productId,
        removedAt: null,
      },
      data: {
        removedAt: new Date(),
      },
    });
  }

  async restore(userId: string, productId: string) {
    return this.prisma.favorite.update({
      where: {
        userId_productId: { userId, productId },
      },
      data: {
        removedAt: null,
      },
    });
  }
}
