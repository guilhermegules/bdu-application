import { Body, Controller, Post } from '@nestjs/common';

import { Public } from './../../core/constants/public.constants';
import { AuthService } from '../services/auth.service';
import { User } from '../../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  public login(@Body() user: User) {
    return this.authService.login(user);
  }
}
