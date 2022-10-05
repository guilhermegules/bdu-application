import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { TransactionAggregation } from './entities/transaction-aggregation.entity';
import { BankAccountModule } from './../bank-account/bank-account.module';
import { TransactionAggregationService } from './services/transaction-aggregation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionAggregation]),
    BankAccountModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionAggregationService],
})
export class TransactionModule {}
