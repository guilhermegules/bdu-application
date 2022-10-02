import { Component, OnDestroy, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';

import { IAuth, IDecodedUser } from '@core/models/auth.model';
import { LocalStorageService } from '@core/services/local-storage.service';
import { UserService } from '@modules/user/services/user.service';
import { IUserAccount } from '@modules/user/models/user.model';
import { Observable, shareReplay, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  public user$!: Observable<IUserAccount>;

  public user!: IDecodedUser;

  private destroyed$ = new Subject<void>();

  constructor(private userService: UserService, private localStorageService: LocalStorageService<IAuth>) {
    this.user = jwtDecode(this.localStorageService.getItem('user')?.access_token ?? '') as IDecodedUser;
  }

  public ngOnInit(): void {
    this.user$ = this.userService.getUserById(this.user.sub).pipe(shareReplay(1), takeUntil(this.destroyed$));
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
