import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Cookie } from '../constants';
import { LoginInformation } from '../interfaces/login-information';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly cookieService: CookieService,
    private readonly http: HttpClient,
    // TODO: Change to strong type
    @Inject('environment') private readonly environment: any
  ) {}

  login$ = (loginInfo: LoginInformation): Observable<LoginResponse> =>
    this.http.post<LoginResponse>(`${this.environment.serverUrl}/login`, {
      userName: loginInfo.userName.toLowerCase(),
      password: loginInfo.password,
      serialNumbers: JSON.stringify(this.environment.serialNumbers),
      expiredDate: this.environment.expiredDate,
    });

  isAuthenticated = () => this.cookieService.check(Cookie.TOKEN);
}
