import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignUpDto } from '../../../shared-contract/dto/auth/sign-up.dto';
import { SignInDto } from '../../../shared-contract/dto/auth/sign-in.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  refresh(@Req() req: Request) {
    return this.authService.refresh(req);
  }

  @Post('sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(dto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // TODO: set to true in production with HTTPS
      sameSite: 'strict',
    });

    return { accessToken };
  }
}
