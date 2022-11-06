import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';

import { Observable, shareReplay } from 'rxjs';

import { IAuth, IDecodedUser } from '@core/models/auth.model';
import { LocalStorageService } from '@core/services/local-storage.service';
import { UserService } from '../../services/user.service';
import { IUserAccount } from '../../models/user.model';
import { USER_KEY } from '../../constants/local-storage.constants';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public user$!: Observable<IUserAccount>;

  public user!: IDecodedUser;

  constructor(private userService: UserService, private localStorageService: LocalStorageService<IAuth>) {
    this.user = jwtDecode(this.localStorageService.getItem(USER_KEY)?.access_token ?? '') as IDecodedUser;
  }

  public ngOnInit(): void {
    this.user$ = this.userService.getUserById(this.user.sub).pipe(shareReplay(1));
  }
}
