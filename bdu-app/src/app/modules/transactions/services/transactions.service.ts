import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICreateTransactionResponse, ITransaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  public createTransaction(payload: ITransaction): Observable<ICreateTransactionResponse> {
    return this.http.post<ICreateTransactionResponse>(`${environment.BASE_URL}/transaction`, payload);
  }
}
