import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TransactionAggregation {
  @PrimaryGeneratedColumn('increment', { name: 'aggregation_id' })
  public aggregationId: number;

  @Column({ name: 'transaction_sender', length: 17 })
  public transactionSender: string;

  @Column({ name: 'transaction_receiver', length: 17 })
  public transactionReceiver: string;

  @Column({ name: 'transaction_id', length: 36 })
  public transactionId: string;
}
