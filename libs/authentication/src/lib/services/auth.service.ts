import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerSetting, SettingService } from '@container-management/setting';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Cookie } from '../constants';
import { LoginInformation } from '../interfaces/login-information';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly isAuthenticated$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.cookieService.check(Cookie.TOKEN));

  constructor(
    private readonly router: Router,
    private readonly cookieService: CookieService,
    private readonly settingService: SettingService,
    private readonly http: HttpClient,
    // TODO: Change to strong type
    @Inject('environment') private readonly environment: any
  ) {}

  login$ = (loginInfo: LoginInformation): Observable<boolean> =>
    this.http
      .post<LoginResponse>(`${this.environment.serverUrl}/login`, {
        userName: loginInfo.userName.toLowerCase(),
        password: loginInfo.password,
        serialNumbers: JSON.stringify(this.environment.serialNumbers),
        expiredDate: this.environment.expiredDate,
      })
      .pipe(
        switchMap((response) => {
          this.storeLoginInformation(
            response.token,
            loginInfo.userName.toLowerCase()
          );
          this.settingService.storeImageSettings(response.imageMaxSizes);
          this.settingService.initUploadSettings(
            JSON.parse(response.settings) as ServerSetting
          );

          this.isAuthenticated$.next(true);
          return this.router.navigate(['container']);
        })
      );

  logout() {
    localStorage.clear();
    this.cookieService.delete(Cookie.TOKEN);
    this.isAuthenticated$.next(false);
    return this.router.navigate(['/', 'login']);
  }

  private storeLoginInformation(token: string, userName: string) {
    this.cookieService.set(Cookie.TOKEN, token, 1);
    this.settingService.storeUserName(userName);
  }
}
