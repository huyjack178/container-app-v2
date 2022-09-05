import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { defaultSettings } from '../constants';
import { ServerSetting, SettingForm, UploadSettings } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  //public readonly serverSetting$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly uploadSettings: UploadSettings = JSON.parse(localStorage.getItem('uploadSettings') ?? JSON.stringify(defaultSettings));

  initUploadSettings(serverSettings: ServerSetting) {
    this.uploadSettings.ftp.enabled = this.uploadSettings.ftp.enabled && serverSettings.ftp.enabled;
    this.uploadSettings.cloudinary.enabled = this.uploadSettings.cloudinary.enabled && serverSettings.cloudinary.enabled;
    this.uploadSettings.local.enabled = serverSettings.local.enabledHigh || serverSettings.local.enabledLow;
    localStorage.setItem('uploadSettings', JSON.stringify(this.uploadSettings));
  }

  adjustUploadSettings(settingFormValue: SettingForm) {
    this.uploadSettings.local.enabled = settingFormValue.local;
    this.uploadSettings.ftp.enabled = settingFormValue.ftp;
    this.uploadSettings.cloudinary.enabled = settingFormValue.cloudinary;
    localStorage.setItem('uploadSettings', JSON.stringify(this.uploadSettings));
  }

  getUploadSettings(): UploadSettings {
    return JSON.parse(JSON.parse(localStorage.getItem('uploadSettings') ?? JSON.stringify(defaultSettings)));
  }
}
