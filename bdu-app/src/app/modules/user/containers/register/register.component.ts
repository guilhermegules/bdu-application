import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  public onRegister() {
    console.log(this.formGroup.value);
  }

  public redirectToLogin() {
    this.router.navigate(['/']);
  }
}
