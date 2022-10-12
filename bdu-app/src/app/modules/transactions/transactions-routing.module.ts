import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionsContainerComponent } from './containers/transactions-container/transactions-container.component';
import { TransactionsFormComponent } from './containers/transactions-form/transactions-form.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsContainerComponent,
    children: [
      {
        path: '',
        component: TransactionsFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
