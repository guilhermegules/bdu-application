import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BankAccount } from './../entities/bank-account.entity';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount) private repository: Repository<BankAccount>,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    const bankAccount = this.repository.create({
      accountNumber: Math.round(Math.random() * 1000000).toString(),
      balance: createBankAccountDto.balance,
      userId: createBankAccountDto.userId,
    });

    await this.repository.insert(bankAccount);

    return bankAccount;
  }

  findOne(accountNumber: string) {
    return this.repository.findOneBy({ accountNumber });
  }

  findOneByUserId(userId: string) {
    return this.repository.findOneBy({ userId });
  }
}
