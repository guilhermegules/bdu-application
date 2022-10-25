import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LocalStorageService } from '@core/services/local-storage.service';
import { AuthService } from '@core/services/auth.service';
import { IAuth } from '@core/models/auth.model';
import { UserService } from '../../services/user.service';
import { IRegisterUser } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public formGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    password: ['', [Validators.required]],
    cellphone: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private localStorageService: LocalStorageService<IAuth>,
    private snackBar: MatSnackBar,
  ) {}

  public onRegister() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;

    this.userService
      .register(this.formGroup.value as IRegisterUser)
      .pipe(switchMap(user => this.authService.login(user)))
      .subscribe({
        next: login => {
          this.localStorageService.setItem({ data: login, key: 'user' });
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.snackBar.open('Ocorreu um erro no cadastro', 'Fechar', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
      });
  }

  public redirectToLogin() {
    this.router.navigate(['/']);
  }
}
