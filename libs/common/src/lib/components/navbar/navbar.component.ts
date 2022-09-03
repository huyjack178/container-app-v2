import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@container-management/authentication';
import { SettingDialogComponent } from '@container-management/setting';

@Component({
  selector: 'container-management-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    public readonly authService: AuthService,
    private readonly dialog: MatDialog
  ) {}

  openSettingDialog() {
    this.dialog.open(SettingDialogComponent, {
      width: '75%',
    });
  }

  logout() {
    return this.authService.logout();
  }
}
