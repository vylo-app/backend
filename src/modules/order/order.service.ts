import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async addToCart(productId: string, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    let order = await this.prisma.order.findFirst({ where: { userId } });

    if (!order) {
      order = await this.prisma.order.create({
        data: {
          userId,
          amount: 0,
          totalPrice: 0,
        },
      });
    }

    const price = await this.prisma.productPrice.findUnique({
      where: { productId },
    });
    if (!price) throw new NotFoundException('Price not found');

    await this.prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId,
      },
    });

    await this.prisma.order.update({
      where: { id: order.id },
      data: {
        amount: { increment: 1 },
        totalPrice: { increment: price.price },
      },
    });

    return { message: 'Item added to cart' };
  }

  async removeFromCart(itemId: string, userId: string) {
    const item = await this.prisma.orderItem.findUnique({
      where: { id: itemId },
      include: { order: true, product: { include: { price: true } } },
    });

    if (!item || item.order.userId !== userId) {
      throw new NotFoundException('Item not found or unauthorized');
    }

    const price = item.product.price?.price || 0;

    await this.prisma.order.update({
      where: { id: item.orderId },
      data: {
        amount: { decrement: 1 },
        totalPrice: { decrement: price },
      },
    });

    await this.prisma.orderItem.delete({ where: { id: itemId } });

    return { message: 'Item removed from cart' };
  }
}
