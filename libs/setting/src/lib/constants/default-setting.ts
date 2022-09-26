import { ImageSettings, UploadSettings } from '../interfaces';

export const defaultUploadSettings: UploadSettings = {
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

export const defaultImageSettings: ImageSettings = {
  high: 2100,
  low: 840,
};
