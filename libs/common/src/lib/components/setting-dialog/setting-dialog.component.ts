import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SettingService } from '../../services';

@Component({
  selector: 'container-management-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss'],
})
export class SettingDialogComponent {
  panelOpenState = true;
  uploadSettings = JSON.parse(localStorage.getItem('uploadSettings') || '');

  constructor(private readonly settingDialog: MatDialog, public readonly settingService: SettingService){}
  
  onSubmit(settingForm: NgForm) {
    this.uploadSettings.local.enabled = settingForm.value.local;
    this.uploadSettings.ftp.enabled = settingForm.value.ftp;
    this.uploadSettings.cloudinary.enabled = settingForm.value.cloudinary;
    localStorage.setItem('uploadSettings', JSON.stringify(this.uploadSettings));
    // TODO: post to server
    this.settingDialog.closeAll();
  }
}
