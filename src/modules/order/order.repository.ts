import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProductById(productId: string) {
    return this.prisma.product.findUnique({
      where: { id: productId },
    });
  }

  async findUserOrder(userId: string) {
    return this.prisma.order.findFirst({
      where: { userId },
    });
  }

  async createOrder(userId: string) {
    return this.prisma.order.create({
      data: {
        userId,
        amount: 0,
        totalPrice: 0,
      },
    });
  }

  async createOrderItem(orderId: string, productId: string) {
    return this.prisma.orderItem.create({
      data: {
        orderId,
        productId,
      },
    });
  }

  async updateOrderAmountAndPrice(
    orderId: string,
    amountDelta: number,
    priceDelta: number,
  ) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        amount: { increment: amountDelta },
        totalPrice: { increment: priceDelta },
      },
    });
  }

  async findOrderItemByProduct(userId: string, productId: string) {
    return this.prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId,
        },
      },
      include: {
        order: true,
        product: true,
      },
    });
  }

  async deleteOrderItem(itemId: string) {
    return this.prisma.orderItem.delete({
      where: { id: itemId },
    });
  }
}
