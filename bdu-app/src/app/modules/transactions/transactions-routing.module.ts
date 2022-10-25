import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { TransactionResultComponent } from './containers/transaction-result/transaction-result.component';

import { TransactionsContainerComponent } from './containers/transactions-container/transactions-container.component';
import { TransactionsFormComponent } from './containers/transactions-form/transactions-form.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: TransactionsFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'result',
        component: TransactionResultComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
