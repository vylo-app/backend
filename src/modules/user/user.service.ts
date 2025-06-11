import { Injectable } from '@nestjs/common';
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

  update(id: string, dto: UpdateUserDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
