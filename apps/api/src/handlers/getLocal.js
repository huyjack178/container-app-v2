const fs = require('fs');
const { generateLocalFolderPath } = require('./uploadLocal');
const stream = require('stream');

const getImageFiles = async (req, res) => {
  const folderPath = generateLocalFolderPath(req);
  fs.readdir(folderPath, (err, files) => {
    res.code(200).send({ path: folderPath, images: files });
  });
};

const downloadImageFile = async (req, res) => {
  const filePath = req.body.filePath;
  fs.readFile(filePath, (err, buffer) => {
    if (err) {
      console.error(err);
      res.code(500).send({
        err,
      });
      return;
    }

    res.send({ src: 'data:image/jpeg;base64,' + buffer.toString('base64') });
  });
};

module.exports = {
  getImageFilesFromLocal: getImageFiles,
  downloadImageFilesFromLocal: downloadImageFile,
};
