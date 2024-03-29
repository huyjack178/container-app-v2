const configs = require('../configs');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const address = require('address');
const { buildContainerFolder } = require('../utils/common');

const uploadLocal = async (req, res) => {
  console.log(req.body);
  const file = req.file;
  const fileName = file.originalname + '.jpg';
  const folderPath = generateLocalFolderPath(req);
  const photoFolderPath = mkDirByPathSync(folderPath);

  uploadToLocal(file.buffer, fileName, photoFolderPath, (err) => {
    let response;

    if (err) {
      response = { error: err, success: false };
    } else {
      response = {
        success: true,
        path: `${address.ip()}\\\\${photoFolderPath}`,
      };
    }

    res.code(200).send({
      local: response,
    });
  });
};

const uploadToLocal = async (
  fileContent,
  fileName,
  photoFolderPath,
  callback
) => {
  try {
    fs.writeFileSync(`${photoFolderPath}/${fileName}`, fileContent);
  } catch (err) {
    console.error(err);
    callback(err);
  }

  callback();
};

const mkDirByPathSync = (targetDir, { isRelativeToScript = false } = {}) => {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir, { recursive: true });
    } catch (err) {
      if (err.code === 'EEXIST') {
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') {
        // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || (caughtErr && curDir === path.resolve(targetDir))) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
};

const generateLocalFolderPath = (req) => {
  const date = req.body.fileDate;
  const opt = req.body.opt;

  let rootFolderPath = '';
  if (
    req.body.isHighResolution === true ||
    req.body.isHighResolution === 'true'
  ) {
    rootFolderPath = `${configs.uploadDirectoryPath.high}/${moment(date).format(
      'YYYY'
    )}`;
  } else {
    rootFolderPath = `${configs.uploadDirectoryPath.low}/${moment(date).format(
      'YYYY'
    )}_GIAM`;
  }

  return `${rootFolderPath}/${buildContainerFolder({
    date,
    opt,
    userName: req.body.userName,
    fileId: req.body.fileId,
  })}`;
};

module.exports = { uploadLocal, generateLocalFolderPath };
