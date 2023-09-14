/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const db = require('./app/models');
const indexRouter = require('./app/routes/index.routes')();
const campaignRouter = require('./app/routes/campaign.routes')();
const populateDB = require('./app/utils/populateDB');

dotenv.config();

const app = express();

const corsOptions = { origin: 'http://localhost:8081' };

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/campaigns', campaignRouter);

app.set('views', path.join(__dirname, 'app', 'views'));

app.set('view engine', 'pug');

// syncing db
db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .then(() => {
    const data = db.canals.findOne({
      attributes: ['id'],
    });
    return Promise.resolve(data);
  })
  // adding keyboards if needed
  .then((data) => {
    if (!data) {
      console.log('populating database with canals');
      populateDB();
    } else {
      console.log('database is already populated with canals');
    }
  })
  .catch((err) => {
    console.log(`Failed to sync db or populate with canals: ${err.message}`);
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
