import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserRepository } from '../user/user.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
