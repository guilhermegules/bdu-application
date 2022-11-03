import { TransactionTypeEnum } from '../enums/transaction.enum';

export interface TransactionRaw {
  transaction_transaction_id: string;
  transaction_amount: string;
  transaction_type: TransactionTypeEnum;
  transaction_aggregation_aggregation_id: number;
  transaction_aggregation_transaction_sender: string;
  transaction_aggregation_transaction_receiver: string;
  transaction_aggregation_transaction_id: string;
  account_account_number: string;
  account_balance: string;
  account_create_date: string;
  account_user_id: string;
}

export interface ITransaction {
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
