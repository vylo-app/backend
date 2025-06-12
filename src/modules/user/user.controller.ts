import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../../../shared-contract/dto/user/create-user.dto';
import { UpdateUserDto } from '../../../shared-contract/dto/user/update-user.dto';
import { CurrentUserId } from 'src/common/decorators/CurrentUserId.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUserId() currentUserId: string) {
    return this.userService.findOne(currentUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(@CurrentUserId() currentUserId: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(currentUserId, dto, currentUserId);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
