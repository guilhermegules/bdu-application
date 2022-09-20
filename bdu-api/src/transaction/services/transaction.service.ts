import { BusinessException } from './../../core/exceptions/business.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionAggregation } from '../entities/transaction-aggregation.entity';
import { Transaction } from '../entities/transaction.entity';
import { BankAccount } from '../../bank-account/entities/bank-account.entity';
import { BankAccountService } from './../../bank-account/services/bank-account.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionAggregation)
    private transactionAggregationRepository: Repository<TransactionAggregation>,
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
    private bankAccountService: BankAccountService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create({
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      transactionId: uuidv4(),
    });

    const transactionAggregation = this.transactionAggregationRepository.create(
      {
        transactionReceiver: createTransactionDto.transactionReceiver,
        transactionSender: createTransactionDto.transactionSender,
        transactionId: transaction.transactionId,
      },
    );

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
      this.bankAccountRepository.update(
        { accountNumber: createTransactionDto.transactionSender },
        senderAccount,
      ),
      this.bankAccountRepository.update(
        { accountNumber: createTransactionDto.transactionReceiver },
        receiverAccount,
      ),
      this.transactionRepository.insert(transaction),
      this.transactionAggregationRepository.insert(transactionAggregation),
    ]);

    return {
      senderAccount: {
        balance: senderAccount.balance,
        accountNumber: senderAccount.accountNumber,
      },
      receiverAccount: {
        balance: receiverAccount.balance,
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
