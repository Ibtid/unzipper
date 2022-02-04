const multer = require('multer');

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/zip');
    },
    filename: (req, file, cb) => {
      cb(null, 'newChapters' + '.' + 'zip');
    },
  }),
});

module.exports = fileUpload;
