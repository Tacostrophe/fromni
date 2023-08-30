const { custom, body } = require('express-validator');
const db = require('../../models');

const campaignValidationRules = [
    body('campaigns.*.canal', 'that canal doesnt exist')
      .custom(async(value, { req }) => {
        const canalObjects = await db.canals.findAll({ attributes: ['name'] });
        const canalNames = canalObjects.reduce((acc, current) => [...acc, current.name], []);
        if (!canalNames.includes(value)) {
          return Promise.reject();
        }
      }),
    body('campaigns.*.keyboard', 'keyboard type expected to be "standard" or "inline"')
      .notEmpty().isIn(['standard', 'inline']),
    body('campaigns.*.message', 'message should be a string')
      .if((value, { req, path }) => value).isString()
      .custom(async(value, { req, path }) => {
          console.log('validating message');
          if (value) {
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
];

module.exports = campaignValidationRules;