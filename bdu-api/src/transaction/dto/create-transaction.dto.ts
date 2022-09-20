import { TransactionTypeEnum } from '../enums/transaction.enum';

export class CreateTransactionDto {
  public transactionSender: string;
  public transactionReceiver: string;
  public amount: number;
  public type: TransactionTypeEnum;
}
