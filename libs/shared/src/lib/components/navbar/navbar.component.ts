import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'container-management-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  openDialog = false;
  
  constructor(private readonly router: Router, private readonly cookieService: CookieService) {}

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('imageMaxSizes');
    localStorage.removeItem('serverSettings');
    localStorage.removeItem('uploadSettings');
    this.cookieService.delete('token');
    this.router.navigate(['/', 'login']);
  }
}
