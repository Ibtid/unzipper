// Import dependencies
const decompress = require('decompress');
const { jsonGen } = require('./arrayGen');
const path = require('path');
const fs = require('fs');

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const unZip = async (req, res) => {
  try {
    await decompress('./uploads/zip/newChapters.zip', 'dist');
  } catch (error) {
    console.log(error);
  }
  try {
    await jsonGen();
  } catch (error) {
    console.log(error);
  }
  try {
    await timeout(2000);
    let dataToSend = require('./data/novels.json');
    console.log(dataToSend.length);
    fs.readdir('./data', (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join('./data', file), (err) => {
          if (err) throw err;
        });
      }
    });

    fs.readdir('./uploads/zip', (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join('./uploads/zip', file), (err) => {
          if (err) throw err;
        });
      }
    });

    return res.status(201).json({
      success: true,
      data: dataToSend,
    });
  } catch (error) {
    fs.readdir('./data', (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join('./data', file), (err) => {
          if (err) throw err;
        });
      }
    });
    fs.readdir('./uploads/zip', (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join('./uploads/zip', file), (err) => {
          if (err) throw err;
        });
      }
    });
    console.log(error);
    return res.status(201).json({
      success: false,
      message: 'went wrong',
    });
  }
};

module.exports = { unZip };
