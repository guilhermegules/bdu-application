import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { IAuth } from '@core/models/auth.model';
import { LocalStorageService } from '@core/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService<IAuth>) {}

  canActivate(): boolean {
    return !!this.localStorageService.getItem('user');
  }
}
