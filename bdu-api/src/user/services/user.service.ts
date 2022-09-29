import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BankAccountService } from '../../bank-account/services/bank-account.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private bankAccountService: BankAccountService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      name: createUserDto.name,
      cellphone: createUserDto.cellphone,
      cpf: createUserDto.cpf,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    await this.userRepository.insert(user);

    const account = await this.bankAccountService.create({
      balance: 0,
      userId: user.id,
    });

    return {
      user,
      account,
    };
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
