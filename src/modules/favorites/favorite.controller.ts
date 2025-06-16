import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUserId } from 'src/common/decorators/CurrentUserId.decorator';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}

  @Get()
  async getAll(@CurrentUserId() userId: string) {
    return this.service.getAll(userId);
  }

  @Post(':productId')
  async add(
    @CurrentUserId() userId: string,
    @Param('productId') productId: string,
  ) {
    return this.service.add(userId, productId);
  }

  @Delete(':productId')
  async remove(
    @CurrentUserId() userId: string,
    @Param('productId') productId: string,
  ) {
    return this.service.remove(userId, productId);
  }
}
