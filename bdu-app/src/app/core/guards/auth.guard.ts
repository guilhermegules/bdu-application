import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { IAuth } from '@core/models/auth.model';
import { LocalStorageService } from '@core/services/local-storage.service';
import { USER_KEY } from '@modules/user/constants/local-storage.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService<IAuth>, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return !!this.localStorageService.getItem(USER_KEY) || this.router.parseUrl('/');
  }
}
