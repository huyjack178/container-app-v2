import { ImageSettings, UploadSettings } from '../interfaces';

export const defaultUploadSettings: UploadSettings = {
  local: {
    enabled: true,
    ip: '',
    enabledHigh: false,
    enabledLow: true
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

export const defaultImageSettings: ImageSettings = {
  high: 2100,
  low: 840,
};


export const defaultServerSettings = {
  local: {
    enabledHigh: false,
    enabledLow: true,
  },
  ftp: {
    enabled: false
  },
  cloudinary: {
    enabled: false
  }
}
