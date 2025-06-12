import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from '../../../shared-contract/dto/user/create-user.dto';
import { UpdateUserDto } from '../../../shared-contract/dto/user/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  create(dto: CreateUserDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  findByEmail(email: string) {
    return this.repo.findByEmail(email);
  }

  async update(id: string, dto: UpdateUserDto, currentUserId: string) {
    if (id !== currentUserId) {
      throw new ForbiddenException('You can only update your own profile.');
    }

    const user = await this.repo.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
