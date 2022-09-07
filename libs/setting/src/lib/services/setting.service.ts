import { Injectable } from '@angular/core';
import { defaultSettings } from '../constants';
import { ServerSetting, SettingForm, UploadSettings } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  initUploadSettings(serverSettings: ServerSetting) {
    try {
      const settings = this.getUploadSettings();
      settings.ftp.enabled = settings.ftp.enabled && serverSettings.ftp.enabled;
      settings.cloudinary.enabled =
        settings.cloudinary.enabled && serverSettings.cloudinary.enabled;
      settings.local.enabled =
        serverSettings.local.enabledHigh || serverSettings.local.enabledLow;
      localStorage.setItem('uploadSettings', JSON.stringify(settings));
    } catch (error) {
      console.error(error);
    }
  }

  adjustUploadSettings(settingFormValue: SettingForm) {
    const settings = this.getUploadSettings();
    settings.local.enabled = settingFormValue.local;
    settings.ftp.enabled = settingFormValue.ftp;
    settings.cloudinary.enabled = settingFormValue.cloudinary;
    localStorage.setItem('uploadSettings', JSON.stringify(settings));
  }

  getUploadSettings(): UploadSettings {
    return JSON.parse(
      localStorage.getItem('uploadSettings') ?? JSON.stringify(defaultSettings)
    );
  }
}
