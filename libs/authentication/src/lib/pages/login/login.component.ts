import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  BehaviorSubject,
  first,
  interval,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'container-management-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  readonly hidePassword$ = new BehaviorSubject(true);
  readonly errorMessage$ = new BehaviorSubject<string>('');
  private readonly unsubscribe$ = new Subject<void>();

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.hidePassword$
      .pipe(
        switchMap(() => interval(1000)),
        tap(() => this.hidePassword$.next(true)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();

    this.errorMessage$
      .pipe(
        switchMap(() => interval(10000)),
        tap(() => this.errorMessage$.next('')),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  showPassword() {
    this.hidePassword$.next(false);
  }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return this.errorMessage$.next(
        'Vui lòng nhập tên đăng nhập và mật khẩu hợp lệ'
      );
    }

    this.authService
      .login$({
        userName: loginForm.value.userName,
        password: loginForm.value.password,
      })
      .pipe(first())
      .subscribe({
        error: (error) => this.errorMessage$.next(error?.error),
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
