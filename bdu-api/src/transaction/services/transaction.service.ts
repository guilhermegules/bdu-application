import { BankAccount } from './../../bank-account/entities/bank-account.entity';
import { TransactionAggregation } from './../entities/transaction-aggregation.entity';
import { BusinessException } from './../../core/exceptions/business.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { BankAccountService } from './../../bank-account/services/bank-account.service';
import { TransactionAggregationService } from './transaction-aggregation.service';
import { from } from 'rxjs';
import {
  ITransaction,
  TransactionRaw,
} from '../interfaces/transaction.interface';

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

    if (!senderAccount) {
      throw new BusinessException(
        `Account ${createTransactionDto.transactionSender} not found`,
      );
    }

    if (!receiverAccount) {
      throw new BusinessException(
        `Account ${createTransactionDto.transactionReceiver} not found`,
      );
    }

    if (senderAccount.accountNumber === receiverAccount.accountNumber) {
      throw new BusinessException('The sender cannot be equal to receiver');
    }

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
    const transactionsByAccountNumber: TransactionRaw[] =
      await this.transactionRepository
        .createQueryBuilder('transaction')
        .innerJoinAndSelect(
          TransactionAggregation,
          'transaction_aggregation',
          'transaction.transaction_id = transaction_aggregation.transaction_id',
        )
        .innerJoinAndSelect(
          BankAccount,
          'account',
          'account.account_number = transaction_aggregation.transaction_sender OR account.account_number = transaction_aggregation.transaction_receiver',
        )
        .where('account.account_number = :accountNumber', { accountNumber })
        .getRawMany();

    const allTransactions: ITransaction[] = transactionsByAccountNumber.map(
      (transaction) => ({
        accountBalance: Number(transaction.account_balance),
        accountCreateDate: transaction.account_create_date,
        accountNumber: transaction.account_account_number,
        accountUserId: transaction.account_user_id,
        transactionAggregationId:
          transaction.transaction_aggregation_aggregation_id,
        transactionAggregationTransactionId:
          transaction.transaction_aggregation_transaction_id,
        transactionAmount: Number(transaction.transaction_amount),
        transactionId: transaction.transaction_transaction_id,
        transactionReceiver:
          transaction.transaction_aggregation_transaction_receiver,
        transactionSender:
          transaction.transaction_aggregation_transaction_sender,
        transactionType: transaction.transaction_type,
      }),
    );

    const senderTransactions = allTransactions.filter(
      (transaction) => transaction.transactionSender === accountNumber,
    );

    const receiverTransactions = allTransactions.filter(
      (transaction) => transaction.transactionSender !== accountNumber,
    );

    return { senderTransactions, receiverTransactions };
  }

  findOne(transactionId: string) {
    return this.transactionRepository.findOneBy({ transactionId });
  }
}
