import { UploadSettings } from '../interfaces';

export const defaultSettings: UploadSettings = {
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
