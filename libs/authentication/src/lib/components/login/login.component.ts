import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'container-management-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  hide = true;

  constructor(private readonly authService: AuthService) {}

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      // TODO: validation
      console.log('');
    } else {
      this.authService
        .login({ userName: loginForm.value.userName, password: loginForm.value.password })
        .pipe(first())
        .subscribe((response) => console.log(response));
    }
  }
}
