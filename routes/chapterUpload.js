const express = require('express');

const router = express.Router();

const { unZip } = require('../index');

const fileUpload = require('../middleware/file-upload');

router.post('/zipup', fileUpload.single('zip'), (req, res) => {
  unZip(req, res);
});

module.exports = router;
