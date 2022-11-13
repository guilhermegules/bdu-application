import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMaskModule } from 'ngx-mask';

import { TableComponent } from '@shared/components/table/table.component';
import { MainNavComponent } from '@layout/main-nav/main-nav.component';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsFormComponent } from './containers/transactions-form/transactions-form.component';
import { TransactionsContainerComponent } from './containers/transactions-container/transactions-container.component';
import { TransactionsSideNavComponent } from './components/transactions-side-nav/transactions-side-nav.component';
import { TransactionResultComponent } from './containers/transaction-result/transaction-result.component';
import { TransactionHistoricComponent } from './containers/transaction-historic/transaction-historic.component';

@NgModule({
  declarations: [
    TransactionsFormComponent,
    TransactionsContainerComponent,
    TransactionsSideNavComponent,
    TransactionResultComponent,
    TransactionHistoricComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MainNavComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatSelectModule,
    MatSnackBarModule,
    TableComponent,
    MatTabsModule,
  ],
})
export class TransactionsModule {}
