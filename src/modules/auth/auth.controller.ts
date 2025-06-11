import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto } from '../../../shared-contract/dto/auth/register.dto';
import { LoginDto } from '../../../shared-contract/dto/auth/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  refresh(@Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(res);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // set to true in production with HTTPS
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return { accessToken };
  }
}
