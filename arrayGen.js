const fs = require('fs');
const path = require('path');

const jsonGen = async () => {
  var filteredOneFile = [];
  var filteredAllFiles = [];

  fs.readdir('./dist', async (err, files) => {
    let totalFileLength = files.length;

    for (let k = 0; k < totalFileLength; k++) {
      let textFile = k + 1;

      var text = fs.readFileSync(`./dist/${textFile}.txt`).toString('utf-8');

      var textByLine = text.split('\n');

      filteredOneFile = [];
      for (let i = 0; i < textByLine.length; i++) {
        let levelOne = textByLine[i].replace('\r', '');
        //console.log(levelOne);
        if (levelOne !== '') {
          filteredOneFile.push(levelOne);
        }
      }
      filteredAllFiles.push({
        name: filteredOneFile[0],
        lines: filteredOneFile.filter((f, i) => {
          return i != 0;
        }),
      });
    }

    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join('./dist', file), (err) => {
        if (err) throw err;
      });
    }

    //console.log(filteredAllFiles);
    fs.writeFileSync('./data/novels.json', JSON.stringify(filteredAllFiles));
  });
};

module.exports = { jsonGen };
