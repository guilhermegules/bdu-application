import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { Public } from './../../core/constants/public.constants';
import { AuthService } from '../services/auth.service';
import { User } from '../../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  public async login(@Body() user: User) {
    const validUser = await this.authService.validateUser(
      user.email,
      user.password,
    );

    if (!validUser)
      throw new HttpException(
        `User with email "${user.email}" was not found`,
        HttpStatus.NOT_FOUND,
      );

    return this.authService.login(validUser);
  }
}
