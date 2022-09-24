import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAuth } from '@core/models/auth.model';

import { AuthService } from '@core/services/auth.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public formGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService<IAuth>,
  ) {}

  public onLogin() {
    this.authService.login(this.formGroup.value as IUser).subscribe({
      next: login => {
        this.localStorageService.setItem({ data: login, key: 'user' });
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.snackBar.open('Ocorreu um erro ao realizar o login', 'Fechar', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
    });
  }

  public redirectToRegister() {
    this.router.navigate(['register']);
  }
}
