export const environment = {
  production: false,
  jwtSecret: 'thisissecretjwt',
  imageMaxSizes: {
    high: 2100,
    low: 840,
  },
  uploadDirectoryPath: {
    low: './low',
    high: '',
  },
  users: [
    {
      userName: 'OUT',
      password: '1234',
    },
    {
      userName: 'KC',
      password: '1234',
    },
    {
      userName: 'VS',
      password: '1234',
    },
    {
      userName: 'SC',
      password: '1234',
    },
    {
      userName: 'GD',
      password: '1234',
    },
    {
      userName: 'VP',
      password: '1234',
    },
    {
      userName: 'admin',
      password: '1234',
    },
  ],
  cloudinary: {
    cloud_name: 'harrison178',
    api_key: '249396988716972',
    api_secret: '2gfT6Uar6u8in8Wky2a3D_6pC6s',
  },
  ftp: {
    host: '',
    port: '',
    user: '',
    rootFolder: '',
    password: '',
  },

  // cloudinary: {
  //   cloud_name: '',
  //   api_key: '',
  //   api_secret: '',
  // },
  // ftp: {
  //   host: '',
  //   user: '',
  //   password: '',
  // },
};
