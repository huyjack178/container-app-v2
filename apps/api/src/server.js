const fs = require('fs');
const fastify = require('fastify');
const path = require('path');
const server = fastify(
  process.env.ENV !== 'DEV'
    ? {
        https: {
          allowHTTP1: true,
          key: fs.readFileSync(
            path.join(__dirname, '..', 'https', 'server.key')
          ),
          cert: fs.readFileSync(
            path.join(__dirname, '..', 'https', 'server.cert')
          ),
        },
      }
    : {}
);
const multer = require('fastify-multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadFtpHandler = require('./handlers/uploadFTP');
const uploadCloudHandler = require('./handlers/uploadCloud');
const { uploadLocal } = require('./handlers/uploadLocal');
const loginHandler = require('./handlers/login');
const {
  getImagesFromFtp,
  getFtpFolderPath,
  downloadFile,
} = require('./handlers/getFtp');

const serialNumber = require('serial-number');
const { getExternalUrls } = require('./handlers/getExternalUrls');
const {
  getImageFilesFromLocal,
  downloadImageFilesFromLocal,
} = require('./handlers/getLocal');

server
  .register(multer.contentParser)
  .register(require('fastify-cors'), {
    origin: '*',
  })
  .register(require('fastify-static'), {
    root: path.join(__dirname, 'web'),
  });

server.register(require('./jwt-auth')).after(() => {
  server.post(
    '/uploadCloud',
    { preValidation: [server.authenticate], preHandler: upload.single('file') },
    uploadCloudHandler
  );
  server.post(
    '/uploadFTP',
    { preValidation: [server.authenticate], preHandler: upload.single('file') },
    uploadFtpHandler
  );
  server.post(
    '/uploadLocal',
    { preValidation: [server.authenticate], preHandler: upload.single('file') },
    uploadLocal
  );

  server.get('/', function (req, res) {
    res.sendFile('index.html');
  });

  server.get('/login', function (req, res) {
    res.sendFile('index.html');
  });

  server.get('/container', function (req, res) {
    res.sendFile('index.html');
  });

  server.get('/container/camera', function (req, res) {
    res.sendFile('index.html');
  });

  server.get('/container/action', function (req, res) {
    res.sendFile('index.html');
  });

  server.post('/ftpImages', (req, res) => getImagesFromFtp(req, res));

  server.post('/ftpPath', (req, res) => getFtpFolderPath(req, res));

  server.post('/ftpDownload', (req, res) => downloadFile(req, res));

  server.post('/login', (req, res) => loginHandler(req, res, server));

  server.get('/externalUrls', (req, res) => getExternalUrls(req, res));

  server.post('/localImages', (req, res) => getImageFilesFromLocal(req, res));

  server.post('/localDownload', (req, res) =>
    downloadImageFilesFromLocal(req, res)
  );
});

server.listen(3000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);

  serialNumber(function (error, value) {
    if (error) {
      console.error(error);
    }

    console.log(value);
  });
});
