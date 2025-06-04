import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller('/health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getHealth() {
    const timestamp = new Date().toISOString();
    const message = {
      status: 'ok',
      timestamp: timestamp,
      environment: 'development',
    };

    return message;
  }
}
