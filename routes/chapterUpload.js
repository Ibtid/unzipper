const express = require('express');

const router = express.Router();

const { unZip } = require('../index');

const fileUpload = require('../middleware/file-upload');

router.post('/zipup', fileUpload.single('zip'), async (req, res) => {
  try{
    await unZip(req, res);
  }
  catch(error){
    console.log(error);
    res.status(201).json({
      success: false,
      message: 'went wrong',
    });
  }
});

module.exports = router;
