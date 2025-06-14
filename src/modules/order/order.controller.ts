import { Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUserId } from 'src/common/decorators/CurrentUserId.decorator';
import { OrderService } from './order.service';

@UseGuards(JwtAuthGuard)
@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':productId')
  addToCart(
    @Param('productId') productId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.orderService.addToCart(userId, productId);
  }

  @Delete(':productId')
  removeFromCart(
    @Param('productId') productId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.orderService.removeFromCart(userId, productId);
  }
}
