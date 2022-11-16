import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@container-management/authentication';
import { SettingDialogComponent } from '@container-management/setting';
import { Router } from '@angular/router';
import { ContainerFacade } from '@container-management/container-camera';

@Component({
  selector: 'container-management-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    public readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly containerFacade: ContainerFacade
  ) {}

  openSettingDialog() {
    this.dialog.open(SettingDialogComponent, {
      width: '75%',
    });
  }

  logout() {
    return this.authService.logout();
  }

  backToHome() {
    this.containerFacade.resetState();
    return this.router.navigateByUrl('/');
  }
}
