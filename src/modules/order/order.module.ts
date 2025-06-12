import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderItemController } from './order.controller';

@Module({
  imports: [PrismaModule],
  controllers: [OrderItemController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
