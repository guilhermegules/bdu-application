import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../services/user.service';
import { Public } from '../../core/constants/public.constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    if (!user)
      throw new HttpException(
        `User with id "${id}" was not found`,
        HttpStatus.NOT_FOUND,
      );

    return user;
  }
}
