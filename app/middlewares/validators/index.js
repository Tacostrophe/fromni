const { validationResult } = require('express-validator');
const db = require('../../models');

const validate = (validationRules) => {
  return async (req, res, next) => {
    const canalObjects = await db.canals.findAll({
      attributes: ['name'],
    });
    const canals = canalObjects.reduce((acc, curr) => [...acc, curr.name], []);

    await Promise.all(validationRules.map((rule) => rule.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    const errors = result.array();
    
    return res.render('campaignCreate', {
      title: 'Create campaigns',
      canals: canals,
      campaigns: req.body.campaigns,
      errors: errors,
    });
  };
};

module.exports = validate;