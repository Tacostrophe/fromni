const { custom, body } = require('express-validator');

const campaignValidationRules = (req, res, next) => {
  return [
    body('campaigns.*.canal', 'canal name is required').notEmpty().isString(),
    body('campaigns.*.keyboard', 'keyboard type is required').notEmpty().isIn(['standard', 'inline']),
    body('campaigns.*.message', 'message should be a string').isString(),
    body('campaigns.*.buttons', 'something wrong with buttons').isArray().custom((value, { req }) => {
      
    }),
  ];
};

module.exports = campaignValidationRules;