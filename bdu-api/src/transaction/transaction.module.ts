import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { BankAccount } from './../bank-account/entities/bank-account.entity';
import { TransactionAggregation } from './entities/transaction-aggregation.entity';
import { BankAccountModule } from './../bank-account/bank-account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transaction,
      TransactionAggregation,
      BankAccount,
    ]),
    BankAccountModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
