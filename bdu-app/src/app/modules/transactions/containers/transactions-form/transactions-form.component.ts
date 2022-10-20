import { LocalStorageService } from '@core/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';

import { MaskPipe } from 'ngx-mask';
import { IAuth, IDecodedUser } from '@core/models/auth.model';
import { UserService } from '@modules/user/services/user.service';
import { IUserAccount } from '@modules/user/models/user.model';
import { TransactionsFormStateService } from '@modules/transactions/services/transactions-form-state.service';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionTypeEnum } from '../../enums/transaction-type.enum';
import { ITransaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions-form',
  templateUrl: './transactions-form.component.html',
  styleUrls: ['./transactions-form.component.scss'],
  providers: [MaskPipe],
})
export class TransactionsFormComponent implements OnInit {
  public form = this.fb.group({
    amount: [0, Validators.required],
    transactionReceiver: ['', Validators.required],
    type: [TransactionTypeEnum.TED, Validators.required],
  });

  public transactionTypes = Object.values(TransactionTypeEnum).map(type => ({
    value: type,
    viewValue: type,
  }));

  public userAccount!: IUserAccount;

  private user!: IDecodedUser;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService<IAuth>,
    private userService: UserService,
    private transactionService: TransactionsService,
    private trasactionFormState: TransactionsFormStateService,
    private maskPipe: MaskPipe,
  ) {
    this.user = jwtDecode(this.localStorageService.getItem('user')?.access_token ?? '') as IDecodedUser;
  }

  public ngOnInit(): void {
    this.userService.getUserById(this.user.sub).subscribe(user => {
      this.userAccount = user;
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
      transactionSender: this.userAccount.accountNumber,
    } as ITransaction;

    this.transactionService.createTransaction(payload).subscribe(transaction => {
      this.trasactionFormState.setCreateTransactionResponseState(transaction);
    });
  }

  public formatCurrency(value: number) {
    return this.maskPipe.transform(value, 'R$ 9999999.99', '.');
  }
}
