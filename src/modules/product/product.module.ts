import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductRepository } from './product.repository';
import { FavoriteModule } from '../favorites/favorite.module';

@Module({
  imports: [PrismaModule, FavoriteModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
