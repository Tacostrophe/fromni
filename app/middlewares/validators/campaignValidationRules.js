const { custom, body } = require('express-validator');
const db = require('../../models');

const campaignValidationRules = [
  body('campaigns', 'canal should be unique')
    .custom((value) => {
      console.log(value);
      const canals = value.reduce((acc, curr) => [...acc, curr.canal], []);
      if (canals.length > new Set(canals).size) {
        return Promise.reject();
      }
    }),
  body('campaigns.*.canal', 'that canal doesnt exist').trim()
    .custom(async(value, { req }) => {
      const canalObjects = await db.canals.findAll({ attributes: ['name'] });
      const canalNames = canalObjects.reduce((acc, current) => [...acc, current.name], []);
      if (!canalNames.includes(value)) {
        return Promise.reject();
      }
    }).escape(),
  body('campaigns.*.keyboard', 'keyboard type expected to be "standard" or "inline"')
    .notEmpty().isIn(['standard', 'inline']),
  body('campaigns.*.message', 'message should be a string')
    .if((value, { req, path }) => value).isString()
    .custom(async(value, { req, path }) => {
      if (typeof value == 'string') {
        const { groups } = path.match(/^campaigns\[(?<campaignIndex>\d+)\].message$/);
        const campaignIndex = +groups.campaignIndex;
        const canal = req.body.campaigns[campaignIndex].canal;

        if (canal) {
          const canalSetup = await db.canals.findOne({
            where: { name: canal },
            attributes: ['message_max_length'],
          });
          
          if (canalSetup.message_max_length
            && value.length > canalSetup.message_max_length) {
            return Promise.reject(`Message max length: ${canalSetup.message_max_length}`);
          }
        }
      }
    }),
  body('campaigns.*.buttons')
  .if((value, { req, path }) => value).isArray()
    .custom(async(value, { req, path }) => {
      if (Array.isArray(value)) {
        const { groups } = path.match(/^campaigns\[(?<campaignIndex>\d+)\].buttons$/);
        const campaignIndex = +groups.campaignIndex;
        const campaign = req.body.campaigns[campaignIndex];
        if (campaign.canal && ['standard', 'inline'].includes(campaign.keyboard)) {
          const canal = await db.canals.findOne({
            include: (campaign.keyboard == 'inline' ? 'keyboardInline' : 'keyboardStandard'),
            where: { name: campaign.canal },
          });
          const keyboard = canal.keyboardInline ?? canal.keyboardStandard;
          // button amount validation
          if (value.length > +keyboard.button_max_amount) {
            return Promise.reject(`Button amount can't be more than ${keyboard.button_max_amount}`);
          }
          // link-button amount validation
          const linkButtonAmount = value.reduce((acc, curr) => (curr.type == 'link' ? acc+1 : acc), 0);
          if (isFinite(+keyboard.link_button_amount)) {
            if ((+keyboard.link_button_amount) == 0 && linkButtonAmount > 0) {
              return Promise.reject('link-buttons are\'not supported');
            } else if ((+keyboard.link_button_amount) < linkButtonAmount) {
              return Promise.reject(`link-button amount can't be more than ${keyboard.link_button_amount}`);
            }
          }
        }
      }
    }),
  body('campaigns.*.buttons.*.text', 'Button text is required').notEmpty()
    .custom(async(value, { req, path }) => {
      const { groups } = path.match(/^campaigns\[(?<campaignIndex>\d+)\].buttons\[\d+\].text$/);
      const campaignIndex = +groups.campaignIndex;
      const campaign = req.body.campaigns[campaignIndex];
      if (campaign.canal && ['standard', 'inline'].includes(campaign.keyboard)) {
        const canal = await db.canals.findOne({
          include: (campaign.keyboard == 'inline' ? 'keyboardInline' : 'keyboardStandard'),
          where: { name: campaign.canal },
        });
        const keyboard = canal.keyboardInline ?? canal.keyboardStandard;
        if (keyboard.button_message_max_length
          && keyboard.button_message_max_length < value.length) {
          return Promise.reject(`Button text can't be longer than ${keyboard.button_message_max_length}`);
        }
      }
    }),
];

module.exports = campaignValidationRules;