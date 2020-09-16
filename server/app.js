require('dotenv').config()

const express = require('express');
const route = require('./routes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(route)

if (process.env.NODE_ENV != 'test')
  app.listen(port, () => console.log(`listening at port ${port}`));

module.exports = app;
