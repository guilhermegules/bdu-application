import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ColumnNumericTransformer } from '../../core/transformers/column-numeric-transformer';
import { TransactionTypeEnum } from '../enums/transaction.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid', { name: 'transaction_id' })
  public transactionId: string;

  @Column({ type: 'decimal', transformer: new ColumnNumericTransformer() })
  public amount: number;

  @Column({ type: 'enum', enum: TransactionTypeEnum })
  public type: TransactionTypeEnum;
}
