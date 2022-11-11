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
    balance: number;
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

export interface ITransactionHistoricItem {
  transactionId: string;
  transactionAmount: number;
  transactionType: TransactionTypeEnum;
  transactionAggregationId: number;
  transactionSender: string;
  transactionReceiver: string;
  transactionAggregationTransactionId: string;
  accountNumber: string;
  accountBalance: number;
  accountCreateDate: string;
  accountUserId: string;
}

export interface ITransactionHistoric {
  senderTransactions: ITransactionHistoricItem[];
  receiverTransactions: ITransactionHistoricItem[];
}
