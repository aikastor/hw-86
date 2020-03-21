const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const routes = require('./routes/index');

const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  app.use('/', routes);

  app.listen(port, () => {
    console.log(`HTTP Server started on ${port} port!`);
  });
};
run().catch(e => {
  console.error(e);
});