import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  canActivate() {
    console.log('Role Guard');
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['camera']);
      return false;
    }

    return true;
  }
}
