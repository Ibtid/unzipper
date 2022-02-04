const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const chaptersRoutes = require('./routes/chapterUpload');

const app = express();

app.use(bodyParser.json());

app.use('/uploads/zip', express.static(path.join('uploads', 'zip')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

//routes
app.use('/api/', chaptersRoutes);

app.listen(5000, () => {
  console.log('Server running in port 5000');
});
