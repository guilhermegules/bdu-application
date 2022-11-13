import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';
import { UserService } from '@modules/user/services/user.service';
import jwtDecode from 'jwt-decode';
import { switchMap } from 'rxjs';
import { USER_KEY } from '@modules/user/constants/local-storage.constants';
import { IAuth, IDecodedUser } from '@core/models/auth.model';
import { ITransactionHistoric } from '@modules/transactions/models/transaction.model';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-transaction-historic',
  templateUrl: './transaction-historic.component.html',
  styleUrls: ['./transaction-historic.component.scss'],
})
export class TransactionHistoricComponent implements OnInit {
  public historic = {} as ITransactionHistoric;

  public readonly RECEIVER_LIST_DISPLAYED_COLUMNS = ['transactionAmount', 'transactionSender', 'transactionType'];

  public readonly SENDER_LIST_DISPLAYED_COLUMNS = ['transactionAmount', 'transactionReceiver', 'transactionType'];

  public readonly RECEIVER_LIST_HEADER = {
    transactionAmount: 'Valor recebido',
    transactionSender: 'Transação realizada por',
    transactionType: 'Tipo da transação',
  };

  public readonly SENDER_LIST_HEADER = {
    transactionAmount: 'Valor enviado',
    transactionReceiver: 'Beneficiário',
    transactionType: 'Tipo da transação',
  };

  constructor(
    private transactionsService: TransactionsService,
    private localStorageService: LocalStorageService<IAuth>,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    const { sub } = jwtDecode<IDecodedUser>(this.localStorageService.getItem(USER_KEY)?.access_token ?? '');

    this.userService
      .getUserById(sub)
      .pipe(switchMap(user => this.transactionsService.getHistoric(user.accountNumber)))
      .subscribe(historic => {
        this.historic = historic;
      });
  }
}
