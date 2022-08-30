import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { SettingDialogComponent } from 'libs/common/src/lib/components/setting-dialog/setting-dialog.component';

@Component({
  selector: 'container-management-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private readonly router: Router,
    private readonly cookieService: CookieService,
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
    localStorage.removeItem('userName');
    localStorage.removeItem('imageMaxSizes');
    localStorage.removeItem('serverSettings');
    localStorage.removeItem('uploadSettings');
    this.cookieService.delete('token');
    this.router.navigate(['/', 'login']);
  }
}
