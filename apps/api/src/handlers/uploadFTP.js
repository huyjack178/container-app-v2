const configs = require('../configs');
const ftp = require('basic-ftp');
const { Readable } = require('stream');
const moment = require('moment');
const { buildContainerFolder } = require('../utils/common');
const logger = require('../utils/logger');

/**
 * Express route handler to upload a file to FTP.
 */
const uploadFTP = async (req, res) => {
  logger.log('[uploadFTP] Received upload request');

  try {
    const file = req.file;
    const fileName = `${file.originalname}.jpg`;
    const fileStream = bufferToStream(file.buffer);

    logger.log(`[uploadFTP] Uploading file: ${fileName}`);
    const folderPath = await handleFtpUpload(fileStream, fileName, req);

    logger.log(`[uploadFTP] Upload successful to folder: ${folderPath}`);
    return res.code(200).send({
      ftp: {
        success: true,
        host: configs.ftp.host,
        folderPath,
      },
    });

  } catch (error) {
    logger.error('[uploadFTP] Upload failed:', error);
    return res.code(200).send({
      ftp: {
        success: false,
        error: error.message || error,
      },
    });
  }
};

/**
 * Handles the logic for uploading a file to the FTP server.
 */
const handleFtpUpload = async (fileStream, fileName, req) => {
  const ftpClient = new ftp.Client(10000); // 10s timeout

  try {
    logger.log('[handleFtpUpload] Connecting to FTP server...');
    await ftpClient.access(configs.ftp);
    logger.log('[handleFtpUpload] FTP connection established');

    const { fileDate, opt, userName, fileId } = req.body;

    logger.log('[handleFtpUpload] Building folder structure...');
    const folderPath = `/${moment(fileDate).format('YYYY')}/${buildContainerFolder({
      date: fileDate,
      opt,
      userName,
      fileId,
    })}/`;

    const fullPath = `${configs.ftp.rootFolder}${folderPath}`;
    logger.log(`[handleFtpUpload] Ensuring directory exists: ${fullPath}`);
    await ftpClient.ensureDir(fullPath);

    logger.log(`[handleFtpUpload] Starting upload to: ${fullPath + fileName}`);
    await ftpClient.uploadFrom(fileStream, fullPath + fileName);
    logger.log('[handleFtpUpload] Upload completed');

    return fullPath;

  } catch (err) {
    logger.error('[handleFtpUpload] FTP upload error:', {
      code: err.code,
      errno: err.errno,
      syscall: err.syscall,
      message: err.message,
    });
    throw err;
  } finally {
    ftpClient.close();
    logger.log('[handleFtpUpload] FTP connection closed');
  }
};

/**
 * Converts a Buffer to a readable stream for FTP upload.
 */
const bufferToStream = (buffer) => {
  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
};

module.exports = uploadFTP;
