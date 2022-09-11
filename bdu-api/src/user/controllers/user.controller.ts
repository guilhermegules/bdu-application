import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';

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

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
