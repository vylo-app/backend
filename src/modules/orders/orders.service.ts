import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepo: OrdersRepository) {}

  findAllByUser(userId: string) {
    return this.orderRepo.findAllByUser(userId);
  }
}
