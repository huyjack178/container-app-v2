import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { defaultSettings } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  public readonly serverSetting$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  //uploadSettings = JSON.parse(localStorage.getItem('uploadSettings') || '');

  setUploadSettings() {
    const uploadSettings = JSON.parse(JSON.stringify(defaultSettings));
    const serverSettings = JSON.parse(this.serverSetting$.value);
    uploadSettings.ftp.enabled = uploadSettings.ftp.enabled && serverSettings.ftp.enabled;
    uploadSettings.cloudinary.enabled = uploadSettings.cloudinary.enabled && serverSettings.cloudinary.enabled;
    uploadSettings.local.enabled = serverSettings.local.enabledHigh || serverSettings.local.enabledLow;
    localStorage.setItem('uploadSettings', JSON.stringify(uploadSettings));
  }

  // adjustUploadSettings(settingFormValue: any) {
  //   this.uploadSettings.local.enabled = settingFormValue.local;
  //   this.uploadSettings.ftp.enabled = settingFormValue.ftp;
  //   this.uploadSettings.cloudinary.enabled = settingFormValue.cloudinary;
  //   localStorage.setItem('uploadSettings', JSON.stringify(this.uploadSettings));
  // }
}
