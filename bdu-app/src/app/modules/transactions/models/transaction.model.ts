import { TransactionTypeEnum } from '../enums/transaction-type.enum';

export interface ITransaction {
  transactionSender: string;
  transactionReceiver: string;
  amount: number;
  type: TransactionTypeEnum;
}

export interface ICreateTransactionResponse {
  senderAccount: {
    accountNumber: string;
    amount: number;
  };
  receiverAccount: {
    accountNumber: string;
  };
  transaction: {
    amount: number;
    type: TransactionTypeEnum;
    transactionId: string;
  };
}
