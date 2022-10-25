import { BusinessException } from './../../core/exceptions/business.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { BankAccountService } from './../../bank-account/services/bank-account.service';
import { TransactionAggregationService } from './transaction-aggregation.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private transactionAggregationService: TransactionAggregationService,
    private bankAccountService: BankAccountService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create({
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      transactionId: uuidv4(),
    });

    const [senderAccount, receiverAccount] = await Promise.all([
      this.bankAccountService.findOne(createTransactionDto.transactionSender),
      this.bankAccountService.findOne(createTransactionDto.transactionReceiver),
    ]);

    if (senderAccount.balance - createTransactionDto.amount < 0) {
      throw new BusinessException(
        'Sender account balance cannot be less than zero',
      );
    }

    senderAccount.balance -= createTransactionDto.amount;
    receiverAccount.balance += createTransactionDto.amount;

    await Promise.all([
      this.bankAccountService.update({
        accountNumber: senderAccount.accountNumber,
        balance: senderAccount.balance,
      }),
      this.bankAccountService.update({
        accountNumber: receiverAccount.accountNumber,
        balance: receiverAccount.balance,
      }),
      this.transactionRepository.insert(transaction),
      this.transactionAggregationService.create({
        transactionReceiver: createTransactionDto.transactionReceiver,
        transactionSender: createTransactionDto.transactionSender,
        transactionId: transaction.transactionId,
      }),
    ]);

    return {
      senderAccount: {
        accountNumber: senderAccount.accountNumber,
        balance: senderAccount.balance,
      },
      receiverAccount: {
        accountNumber: receiverAccount.accountNumber,
      },
      transaction,
    };
  }

  async findAllByAccountNumber(accountNumber: string) {
    return [];
  }

  findOne(transactionId: string) {
    return this.transactionRepository.findOneBy({ transactionId });
  }
}
