/**
 * This is an example NODE server used to illustrate file upload
 * without using an external project.
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.post('/api/v1/files/upload', upload.single('image'), (req, res) => {
  res.send(res.file);
});

app.listen(8400);
console.log('Server is listening on port 8400');
