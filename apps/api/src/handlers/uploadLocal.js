const configs = require('../configs');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const address = require('address');
const { buildContainerFolder } = require('../utils/common');
const logger = require('../utils/logger');

/**
 * Express route handler to upload a file locally.
 */
const uploadLocal = async (req, res) => {
  logger.log('[uploadLocal] Received upload request:', req.body);

  try {
    const file = req.file;
    const fileName = `${file.originalname}.jpg`;
    const folderPath = generateLocalFolderPath(req);
    const fullFolderPath = ensureDirectoryExists(folderPath);

    logger.log(`[uploadLocal] Saving file to: ${fullFolderPath}/${fileName}`);
    await saveFileToLocal(file.buffer, fileName, fullFolderPath);

    const response = {
      success: true,
      path: `${address.ip()}\\\\${fullFolderPath}`,
    };

    logger.log('[uploadLocal] Upload successful');
    return res.code(200).send({ local: response });

  } catch (err) {
    logger.error('[uploadLocal] Upload failed:', err);
    return res.code(200).send({
      local: {
        success: false,
        error: err.message || err,
      },
    });
  }
};

/**
 * Saves the file content to the local filesystem.
 */
const saveFileToLocal = (fileBuffer, fileName, folderPath) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(folderPath, fileName);
    fs.writeFile(filePath, fileBuffer, (err) => {
      if (err) {
        logger.error('[saveFileToLocal] Failed to write file:', err);
        return reject(err);
      }
      return resolve();
    });
  });
};

/**
 * Ensures a directory and its parents exist. Creates them if necessary.
 */
const ensureDirectoryExists = (targetDir, { isRelativeToScript = false } = {}) => {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir, { recursive: true });
    } catch (err) {
      if (err.code === 'EEXIST') return curDir;
      if (err.code === 'ENOENT') throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      const critical = ['EACCES', 'EPERM', 'EISDIR'].includes(err.code);
      if (!critical || (critical && curDir === path.resolve(targetDir))) {
        throw err;
      }
    }
    return curDir;
  }, initDir);
};

/**
 * Builds the folder path based on resolution type and metadata.
 */
const generateLocalFolderPath = (req) => {
  const { fileDate, opt, isHighResolution, userName, fileId } = req.body;
  const year = moment(fileDate).format('YYYY');
  const basePath = isHighResolution === true || isHighResolution === 'true'
    ? `${configs.uploadDirectoryPath.high}/${year}`
    : `${configs.uploadDirectoryPath.low}/${year}_GIAM`;

  const folderName = buildContainerFolder({ date: fileDate, opt, userName, fileId });
  return `${basePath}/${folderName}`;
};

module.exports = {
  uploadLocal,
  generateLocalFolderPath,
};
