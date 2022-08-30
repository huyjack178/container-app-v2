import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cookie } from '../constants';
import { LoginInformation } from '../interfaces/login-information';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.cookieService.check(Cookie.TOKEN));

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
    }).pipe(map((response) => {
      this.storeCookie(response, loginInfo.userName.toLowerCase());
      this.isAuthenticated$.next(true);
      return response;
    }));

  private storeCookie(response: LoginResponse, userName: string) {
    this.cookieService.set(Cookie.TOKEN, response.token, 1);
    localStorage.setItem('userName', userName);
    localStorage.setItem('imageMaxSizes', response.imageMaxSizes);
    localStorage.setItem('serverSettings', response.settings);
  }

  logout() {
    this.isAuthenticated$.next(false);
    localStorage.removeItem('userName');
    localStorage.removeItem('imageMaxSizes');
    localStorage.removeItem('serverSettings');
    localStorage.removeItem('uploadSettings');
    this.cookieService.delete(Cookie.TOKEN);
  }
}
