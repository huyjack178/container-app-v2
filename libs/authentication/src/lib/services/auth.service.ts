import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInformation } from '../interfaces/login-information';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serverUrl = 'http://localhost:3001';
  serialNumbers = '9S716R512020ZL8000395';
  expiredDate = '2023-05-01';

  constructor(private readonly http: HttpClient) {}

  login = (loginInfo: LoginInformation): Observable<any> => {
    return this.http.post<LoginInformation>(`${this.serverUrl}/login`, {
      userName: loginInfo.userName.toLowerCase(),
      password: loginInfo.password,
      serialNumbers: JSON.stringify(this.serialNumbers),
      expiredDate: this.expiredDate,
    });
  };
}
