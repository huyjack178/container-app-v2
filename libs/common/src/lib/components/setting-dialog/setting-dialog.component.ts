import { Component } from '@angular/core';

@Component({
  selector: 'container-management-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss'],
})
export class SettingDialogComponent {
  panelOpenState = true;
  uploadSettings = {
    local: {
      enabled: true,
      ip: '',
    },
    ftp: {
      enabled: true,
      host: '',
      username: '',
      password: '',
    },
    cloudinary: {
      enabled: true,
      cloud_name: '',
      api_key: '',
      api_secret: '',
    },
  };

  constructor() {}
}
