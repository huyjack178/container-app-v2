import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Cookie } from '../constants';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private readonly cookieService: CookieService) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get(Cookie.TOKEN);
    return next.handle(
      httpRequest.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
        },
      })
    );
  }
}
