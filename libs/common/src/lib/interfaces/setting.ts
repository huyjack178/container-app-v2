export type UploadSettings = {
    local: {
      enabled: boolean,
      ip: string,
    },
    ftp: {
      enabled: boolean,
      host: string,
      username: string,
      password: string,
    },
    cloudinary: {
      enabled: boolean,
      cloud_name: string,
      api_key: string,
      api_secret: string,
    },
  };

export type ServerSetting = {
  local: {
    enabledHigh: boolean,
    enabledLow: boolean,
  },
  ftp: {
    enabled: boolean,
  },
  cloudinary: {
    enabled: boolean,
  }, 
};
  