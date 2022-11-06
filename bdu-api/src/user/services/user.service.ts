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

    await this.bankAccountService.create({
      balance: 0,
      userId: user.id,
    });

    return {
      ...user,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) return null;

    const account = await this.bankAccountService.findOneByUserId(user.id);

    return {
      ...user,
      accountBalance: account.balance,
      accountNumber: account.accountNumber,
    };
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
