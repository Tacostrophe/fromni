const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const keyboards = require('./keyboard.model');
const buttons = require('./button.model');
const campaigns = require('./campaign.model');
const canals = require('./canal.model');

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
db.buttons = buttons(sequelize, Sequelize);
db.campaigns = campaigns(sequelize, Sequelize);
db.canals = canals(sequelize, Sequelize);

db.canals.belongsTo(db.keyboards, {
  foreignKey: 'keyboardStandardId',
  as: 'keyboardStandard',
});
db.canals.belongsTo(db.keyboards, {
  foreignKey: 'keyboardInlineId',
  as: 'keyboardInline',
});

db.campaigns.hasMany(db.buttons, {as: 'buttons'});
db.buttons.belongsTo(db.campaigns, {
  foreignKey: 'campaignId',
  as: 'campaign',
});

db.canals.hasMany(db.campaigns, {as: 'campaigns'});
db.campaigns.belongsTo(db.canals, {
  foreignKey: 'canalId',
  as: 'canal',
});

module.exports = db;