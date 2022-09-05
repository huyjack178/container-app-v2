import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SettingService } from '@container-management/common';
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
            response,
            loginInfo.userName.toLowerCase()
          );
          this.isAuthenticated$.next(true);
          //this.settingService.serverSetting$.next(response.settings);
          //this.settingService.initUploadSettings(response.settings);
          return this.router.navigate(['container']);
        })
      );

  logout() {
    this.removeLoginInformation();
    this.isAuthenticated$.next(false);
    //this.settingService.serverSetting$.next('');
    return this.router.navigate(['/', 'login']);
  }

  private storeLoginInformation(response: LoginResponse, userName: string) {
    this.cookieService.set(Cookie.TOKEN, response.token, 1);
    localStorage.setItem('userName', userName);
    localStorage.setItem('imageMaxSizes', response.imageMaxSizes);
    localStorage.setItem('serverSettings', JSON.stringify(response.settings));
  }

  private removeLoginInformation() {
    this.cookieService.delete(Cookie.TOKEN);
    localStorage.clear();
  }
}
