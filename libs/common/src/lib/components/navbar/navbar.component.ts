import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SettingDialogComponent } from 'libs/common/src/lib/components/setting-dialog/setting-dialog.component';
import { AuthService } from 'libs/authentication/src/lib/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'container-management-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated$: Observable<boolean> | undefined;
  
  constructor(
    private readonly router: Router,
    private readonly settingDialog: MatDialog,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  openSettingDialog() {
    const dialogRef = this.settingDialog.open(SettingDialogComponent, {
      width: '75%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/', 'login']);
  }
}
