import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ICreateTransactionResponse } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsFormStateService {
  private createTransactionResponseState = new ReplaySubject<ICreateTransactionResponse>(1);

  get createTransactionResponseState$() {
    return this.createTransactionResponseState.asObservable();
  }

  public setCreateTransactionResponseState(transactionResponse: ICreateTransactionResponse): void {
    this.createTransactionResponseState.next(transactionResponse);
  }
}
