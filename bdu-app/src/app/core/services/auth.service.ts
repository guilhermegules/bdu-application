import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IUser } from '@modules/user/models/user.model';
import { environment } from '@environments/environment';
import { IAuth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(user: IUser): Observable<IAuth> {
    return this.http.post<IAuth>(`${environment.BASE_URL}/auth/login`, user);
  }
}
