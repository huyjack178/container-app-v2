import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@container-management/authentication';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';

@Component({
  selector: 'container-management-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    public readonly authService: AuthService,
    private readonly router: Router,
    private readonly settingDialog: MatDialog
  ) {}

  openSettingDialog() {
    const dialogRef = this.settingDialog.open(SettingDialogComponent, {
      width: '75%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    return this.authService.logout();
  }
}
