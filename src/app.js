const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const HTTP_PORT = 8000;

const endpointPrefix = '/api/v1/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});