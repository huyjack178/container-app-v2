module.exports = {
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
  // cloudinary: {
  //   cloud_name: 'harrison178',
  //   api_key: '249396988716972',
  //   api_secret: '2gfT6Uar6u8in8Wky2a3D_6pC6s',
  // },
  // ftp: {
  //   host: 'ftp.dlptest.com',
  //   port: '21',
  //   user: 'dlpuser',
  //   rootFolder: '/',
  //   password: 'rNrKYTX9g7z3RgJRmxWuGHbeu',
  // },
  cloudinary: {
    cloud_name: '',
    api_key: '',
    api_secret: '',
  },
  ftp: {
    host: '',
    port: '',
    user: '',
    rootFolder: '',
    password: '',
  },
  externalUrls: {
    remarkUrl1: {
      title: 'Estimate',
      url: 'https://fr.wikipedia.org/wiki/Main_Page',
    },
    remarkUrl2: {
      title: 'Output',
      url: 'https://fr.wikipedia.org/wiki/Main_Page',
    },
    remarkUrl3: {
      title: 'Remark',
      url: '',
    },
    remarkUrl4: {
      title: 'Remark',
      url: '',
    },
    // remarkUrl5: {
    //   title: 'Estimate',
    //   url: 'https://fr.wikipedia.org/wiki/Main_Page',
    // },
    // remarkUrl6: {
    //   title: 'Estimate',
    //   url: 'https://fr.wikipedia.org/wiki/Main_Page',
    // },
    // remarkUrl7: {
    //   title: 'Estimate',
    //   url: 'https://fr.wikipedia.org/wiki/Main_Page',
    // },
    // remarkUrl8: {
    //   title: 'Estimate',
    //   url: 'https://fr.wikipedia.org/wiki/Main_Page',
    // },
  },
};
