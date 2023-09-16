const ftp = require('basic-ftp');
const configs = require('../configs');
const moment = require('moment/moment');
const fs = require('fs');
const { buildContainerFolder } = require('../utils/common');

const getFtpFolderPath = async (req, res) => {
  const date = req.body.fileDate;
  const fileId = req.body.fileId;
  const userName = req.body.userName;
  const opt = req.body.opt;
  const folderPath = `${configs.ftp.rootFolder}/${moment(date).format(
    'YYYY'
  )}/${buildContainerFolder({
    date,
    opt,
    userName,
    fileId,
  })}/`;
  res.code(200).send({ folderPath });
};

const getImagesFromFtp = async (req, res) => {
  const folderPath = req.body.folderPath;
  const ftpClient = new ftp.Client();

  try {
    await ftpClient.access(configs.ftp);
    const fileInfos = await ftpClient.list(folderPath);
    res.code(200).send(fileInfos.map((file) => file.name));
    ftpClient.close();
  } catch (err) {
    res.code(500).send({
      err,
    });
    console.log(err);
  }
};

const downloadFile = async (req, res) => {
  const filePath = req.body.filePath;
  const client = new ftp.Client();
  const tempFile = 'temp.jpg';
  try {
    await client.access(configs.ftp);
    await client.downloadTo(tempFile, filePath);
    const buffer = fs.readFileSync(tempFile); // sync just for DEMO
    res.send({ src: 'data:image/jpeg;base64,' + buffer.toString('base64') });
  } catch (err) {
    console.error(err);
    res.code(500).send({
      err,
    });
  }
  client.close();
};

module.exports = { getImagesFromFtp, getFtpFolderPath, downloadFile };
