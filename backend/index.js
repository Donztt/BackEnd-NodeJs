const express = require('express');
const app = express();
const routes = require('./routes/router');
const cors = require('cors');
require('dotenv').config();

const conn = require('./db/conn');

app.use(cors());
app.use(express.json());

conn();

app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log('Running on port: ' + process.env.PORT);
});
