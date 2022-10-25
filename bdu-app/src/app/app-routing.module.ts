import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
  },
  {
    path: 'transactions',
    loadChildren: () => import('./modules/transactions/transactions.module').then(m => m.TransactionsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
