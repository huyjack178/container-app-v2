import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'container-management-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  hide = true;
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) {}

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      this.errorMessage = 'Vui lòng nhập tên đăng nhập và mật khẩu hợp lệ';
      setTimeout(() => (this.errorMessage = ''), 1);
    } else {
      this.authService
        .login({
          userName: loginForm.value.userName,
          password: loginForm.value.password,
        })
        .pipe(first())
        .subscribe(
          (response) => {
            this.cookieService.set('token', response.token, 1);
            localStorage.setItem('userName', loginForm.value.userName);
            localStorage.setItem('imageMaxSizes', response.imageMaxSizes);
            localStorage.setItem('serverSettings', response.settings);
            this.router.navigate(['/', 'camera']);
          },
          (error) => {
            this.errorMessage = error.error;
          }
        );
    }
  }
}
