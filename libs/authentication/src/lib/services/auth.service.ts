import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInformation } from '../interfaces/login-information';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    @Inject('environment') private environment: any
  ) {}

  login = (loginInfo: LoginInformation): Observable<any> => {
    return this.http.post<LoginInformation>(
      `${this.environment.serverUrl}/login`,
      {
        userName: loginInfo.userName.toLowerCase(),
        password: loginInfo.password,
        serialNumbers: JSON.stringify(this.environment.serialNumbers),
        expiredDate: this.environment.expiredDate,
      }
    );
  };
}
