import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  public async create(createUserDto: CreateUserDto) {
    const user = this.repository.create({
      name: createUserDto.name,
      cellphone: createUserDto.cellphone,
      cpf: createUserDto.cpf,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    await this.repository.insert(user);

    return user;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }
}
