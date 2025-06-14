import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { ProductModule } from './modules/product/product.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderModule } from './modules/order/order.module';
import { ProductReviewModule } from './modules/product-review/product-review.module';

@Module({
  imports: [
    HealthModule,
    UserModule,
    AuthModule,
    ProductModule,
    OrdersModule,
    OrderModule,
    ProductReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
