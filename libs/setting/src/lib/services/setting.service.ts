import { Injectable } from '@angular/core';
import {
  defaultImageSettings,
  defaultServerSettings,
  defaultUploadSettings,
} from '../constants';
import {
  ImageSettings,
  ServerSetting,
  SettingForm,
  UploadSettings,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  getUploadSettings(): UploadSettings {
    return JSON.parse(
      localStorage.getItem('uploadSettings') ??
        JSON.stringify(defaultUploadSettings)
    );
  }

  getImageSettings(): ImageSettings {
    return JSON.parse(
      localStorage.getItem('imageSetting') ??
        JSON.stringify(defaultImageSettings)
    );
  }

  getServerSettings(): ServerSetting {
    return JSON.parse(
      localStorage.getItem('serverSettings') ??
        JSON.stringify(defaultServerSettings)
    );
  }

  initUploadSettings(serverSettings: ServerSetting) {
    try {
      localStorage.setItem('serverSettings', JSON.stringify(serverSettings));

      const settings = this.getUploadSettings();
      settings.ftp.enabled = settings.ftp.enabled && serverSettings.ftp.enabled;
      settings.cloudinary.enabled =
        settings.cloudinary.enabled && serverSettings.cloudinary.enabled;
      settings.local.enabled =
        serverSettings.local.enabledHigh || serverSettings.local.enabledLow;
      settings.local.enabledHigh = serverSettings.local.enabledHigh;
      settings.local.enabledLow = serverSettings.local.enabledLow;
      localStorage.setItem('uploadSettings', JSON.stringify(settings));
    } catch (error) {
      console.error(error);
    }
  }

  storeImageSettings(imageSetting: string) {
    localStorage.setItem('imageSetting', imageSetting);
  }

  getUserName(): string {
    return (localStorage.getItem('userName') ?? '').toUpperCase();
  }

  storeUserName(userName: string) {
    localStorage.setItem('userName', userName);
  }

  adjustUploadSettings(settingFormValue: SettingForm) {
    const settings = this.getUploadSettings();
    settings.local.enabled = settingFormValue.local;
    settings.ftp.enabled = settingFormValue.ftp;
    settings.cloudinary.enabled = settingFormValue.cloudinary;
    localStorage.setItem('uploadSettings', JSON.stringify(settings));
  }
}
