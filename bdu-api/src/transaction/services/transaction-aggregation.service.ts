import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionAggregationDto } from '../dto/create-transaction-aggregation.dto';
import { TransactionAggregation } from '../entities/transaction-aggregation.entity';

@Injectable()
export class TransactionAggregationService {
  constructor(
    @InjectRepository(TransactionAggregation)
    private transactionAggregationRepository: Repository<TransactionAggregation>,
  ) {}

  async create(createTransactionAggregation: CreateTransactionAggregationDto) {
    const transactionAggregation = this.transactionAggregationRepository.create(
      {
        transactionReceiver: createTransactionAggregation.transactionReceiver,
        transactionSender: createTransactionAggregation.transactionSender,
        transactionId: createTransactionAggregation.transactionId,
      },
    );

    await this.transactionAggregationRepository.insert(transactionAggregation);

    return transactionAggregation;
  }
}
