import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class DefaultGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  canActivate() {
    if (this.authService.isAuthenticated$.value) {
      this.router.navigate(['container']);
      return false;
    }

    return true;
  }
}
