import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { IRegisterUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public register(user: IRegisterUser): Observable<IRegisterUser> {
    return this.http.post<IRegisterUser>(`${environment.BASE_URL}/user`, user);
  }
}
