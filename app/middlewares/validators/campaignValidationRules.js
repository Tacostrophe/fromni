const { custom, body } = require('express-validator');
const db = require('../../models');

const campaignValidationRules = [
  body('campaigns', 'Invalid input')
    .custom((value) => {
      if (value.length > 1) {
        const canalsCount = value.reduce((acc, curr) => {
          if (!acc[curr.canal]) {
            acc[curr.canal] = 1;
          } else {
            acc[curr.canal]++;
          }
          return acc;
        }, {});
        const duplicateCanals = Object.keys(canalsCount).filter((canal) => canalsCount[canal] > 1);
        if (duplicateCanals.length > 0) {
          throw new Error(`Canals should be unique (${duplicateCanals.join(', ')})`);
        }
      }
      return true;
    }),
  body('campaigns.*.canal', 'that canal doesnt exist').trim()
    .custom(async(value, { req }) => {
      const canalObjects = await db.canals.findAll({ attributes: ['name'] });
      const canalNames = canalObjects.reduce((acc, current) => [...acc, current.name], []);
      if (!canalNames.includes(value)) {
        return Promise.reject(`Canal ${value} doesn't exist`);
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
        const campaign = req.body.campaigns[campaignIndex];

        // message length validation
        if (campaign.canal) {
          const canalSetup = await db.canals.findOne({
            where: { name: campaign.canal },
            attributes: ['message_max_length'],
          });
          
          if (canalSetup.message_max_length
            && value.length > canalSetup.message_max_length) {
            return Promise.reject(`Message text for ${campaign.canal} with ${campaign.keyboard} keyboard`
            + ` can't be longer than ${canalSetup.message_max_length}`);
          }
        }
      }
    }),
  body('campaigns.*.buttons', 'Invalid buttons')
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
            return Promise.reject(
              `Button amount for ${campaign.canal} with ${campaign.keyboard} keyboard`
              + ` can't be more than ${keyboard.button_max_amount}`
            );
          }
          // link-button amount validation
          const linkButtonAmount = value.reduce((acc, curr) => (curr.type == 'link' ? acc+1 : acc), 0);
          if (isFinite(+keyboard.link_button_amount)) {
            if ((+keyboard.link_button_amount) == 0 && linkButtonAmount > 0) {
              return Promise.reject(`Link-buttons are not supported for ${campaign.canal} with ${campaign.keyboard} keyboard`);
            } else if ((+keyboard.link_button_amount) < linkButtonAmount) {
              return Promise.reject(
                `Link-button amount for ${campaign.canal} with ${campaign.keyboard} keyboard`
                + ` can't be more than ${keyboard.link_button_amount}`
              );
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
          return Promise.reject(`Button text for ${campaign.canal} with ${campaign.keyboard} keyboard`
          + ` can't be longer than ${keyboard.button_message_max_length}`);
        }
      }
    }),
];

module.exports = campaignValidationRules;