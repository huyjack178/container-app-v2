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
  private userName: string = localStorage.getItem('userName') ?? '';
  private uploadSettings: UploadSettings = JSON.parse(
    localStorage.getItem('uploadSettings') ??
      JSON.stringify(defaultUploadSettings)
  );
  private imageSettings: ImageSettings = JSON.parse(
    localStorage.getItem('imageSetting') ?? JSON.stringify(defaultImageSettings)
  );

  getUploadSettings(): UploadSettings {
    return (
      this.uploadSettings ??
      JSON.parse(
        localStorage.getItem('uploadSettings') ??
          JSON.stringify(defaultUploadSettings)
      )
    );
  }

  getImageSettings(): ImageSettings {
    return (
      this.imageSettings ??
      JSON.parse(
        localStorage.getItem('imageSetting') ??
          JSON.stringify(defaultImageSettings)
      )
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
      console.log(settings);
      console.log(serverSettings);
      settings.ftp.enabled = serverSettings.ftp.enabled;
      settings.cloudinary.enabled =
        settings.cloudinary.enabled && serverSettings.cloudinary.enabled;
      settings.local.enabled =
        serverSettings.local.enabledHigh || serverSettings.local.enabledLow;
      settings.local.enabledHigh = serverSettings.local.enabledHigh;
      settings.local.enabledLow = serverSettings.local.enabledLow;

      this.uploadSettings = settings;
      localStorage.setItem('uploadSettings', JSON.stringify(settings));
    } catch (error) {
      console.error(error);
    }
  }

  storeImageSettings(imageSetting: ImageSettings) {
    this.imageSettings = imageSetting;
    localStorage.setItem('imageSetting', JSON.stringify(imageSetting));
  }

  getUserName(): string {
    const userName = (
      this.userName ?? localStorage.getItem('userName')
    ).toUpperCase();
    return userName;
  }

  storeUserName(userName: string) {
    this.userName = userName.toUpperCase();
    localStorage.setItem('userName', userName.toUpperCase());
  }

  adjustUploadSettings(settingFormValue: SettingForm) {
    const settings = this.getUploadSettings();
    settings.local.enabled = settingFormValue.local;
    settings.ftp.enabled = settingFormValue.ftp;
    settings.cloudinary.enabled = settingFormValue.cloudinary;
    localStorage.setItem('uploadSettings', JSON.stringify(settings));
  }

  clear() {
    localStorage.clear();
  }
}
