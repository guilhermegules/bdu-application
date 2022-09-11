import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { Public } from './../../core/constants/public.constants';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public login(@Request() request) {
    return this.authService.login(request.user);
  }
}
