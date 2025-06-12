import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly repo: OrderRepository) {}

  async addToCart(userId: string, productId: string) {
    const product = await this.repo.findProductById(productId);
    if (!product) throw new NotFoundException('Product not found');

    let order = await this.repo.findUserOrder(userId);
    if (!order) {
      order = await this.repo.createOrder(userId);
    }

    // TODO: Do something with price
    // const price = await this.repo.findProductPrice(productId);
    // if (!price) throw new NotFoundException('Price not found');

    await this.repo.createOrderItem(order.id, productId);

    await this.repo.updateOrderAmountAndPrice(order.id, 1, 0);

    return { message: 'Item added to cart' };
  }

  async removeFromCart(itemId: string, userId: string) {
    const item = await this.repo.findOrderItemById(itemId);
    if (!item || item.order.userId !== userId) {
      throw new NotFoundException('Item not found or unauthorized');
    }

    const price = item.product.price?.price || 0;

    await this.repo.updateOrderAmountAndPrice(item.orderId, -1, -price);
    await this.repo.deleteOrderItem(itemId);

    return { message: 'Item removed from cart' };
  }
}
