import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';

import { MainNavComponent } from '@layout/main-nav/main-nav.component';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { UserDashboardComponent } from './containers/user-dashboard/user-dashboard.component';
import { UserContainerComponent } from './containers/user-container/user-container.component';
import { DashboardAsideMenuComponent } from './components/dashboard-aside-menu/dashboard-aside-menu.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    UserContainerComponent,
    DashboardAsideMenuComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
    MainNavComponent,
    MatIconModule,
  ],
})
export class UserModule {}
