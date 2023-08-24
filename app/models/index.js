const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const keyboards = require('./keyboard.model');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE ?? 'db',
  process.env.PGUSER ?? 'postgres',
  process.env.PGPASSWORD ?? 'root',
  {
    host: process.env.HOST ?? 'localhost',
    dialect: 'postgres',
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.keyboards = keyboards(sequelize, Sequelize);

module.exports = db;