import { Component, OnInit } from '@angular/core';
import { ICreateTransactionResponse } from '@modules/transactions/models/transaction.model';
import { TransactionsFormStateService } from '@modules/transactions/services/transactions-form-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-result',
  templateUrl: './transaction-result.component.html',
  styleUrls: ['./transaction-result.component.scss'],
})
export class TransactionResultComponent implements OnInit {
  public transactionFormState$!: Observable<ICreateTransactionResponse>;

  constructor(private transactionFormStateService: TransactionsFormStateService) {}

  public ngOnInit(): void {
    this.transactionFormState$ = this.transactionFormStateService.createTransactionResponseState$;
  }
}
