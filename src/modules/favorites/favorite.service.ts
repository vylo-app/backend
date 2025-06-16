import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(private readonly repo: FavoriteRepository) {}

  async getAll(userId: string) {
    const favorites = await this.repo.findAllByUser(userId);
    return favorites.map((f) => f.product);
  }

  async add(userId: string, productId: string) {
    const existing = await this.repo.findRaw(userId, productId);

    if (existing && !existing.removedAt) {
      throw new ConflictException('Already in favorites');
    }

    if (existing && existing.removedAt) {
      return this.repo.restore(userId, productId); // Restores soft-deleted favorite
    }

    return this.repo.add(userId, productId);
  }

  async remove(userId: string, productId: string) {
    const existing = await this.repo.find(userId, productId); // Already filtered
    if (!existing) throw new NotFoundException('Favorite not found');

    return this.repo.softDelete(userId, productId);
  }

  async isFavorited(userId: string, productId: string): Promise<boolean> {
    return !!(await this.repo.find(userId, productId));
  }
}
