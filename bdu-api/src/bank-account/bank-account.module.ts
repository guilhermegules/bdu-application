import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BankAccount } from './entities/bank-account.entity';
import { BankAccountService } from './services/bank-account.service';
import { BankAccountController } from './controllers/bank-account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount])],
  controllers: [BankAccountController],
  providers: [BankAccountService],
  exports: [BankAccountService],
})
export class BankAccountModule {}
