import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './containers/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, UserRoutingModule, MatCardModule, MatButtonModule, MatInputModule],
})
export class UserModule {}
