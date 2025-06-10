import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserRepository } from '../user/user.repository';

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
