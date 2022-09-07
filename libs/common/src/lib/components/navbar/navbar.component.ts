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
