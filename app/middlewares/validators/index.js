const { validationResult } = require('express-validator');
const db = require('../../models');

const validate = (validationRules) => async (req, res, next) => {
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
  const globalErrors = [];
  const { campaigns } = req.body;

  errors.forEach((error) => {
    const pathList = error.path.split(/\[|\]\.|\./);
    if (pathList.length < 2) {
      globalErrors.push(error);
    } else if (pathList.length < 4) {
      const [, campaignIndex] = pathList;
      if (!campaigns[campaignIndex].errors) {
        campaigns[campaignIndex].errors = [];
      }
      campaigns[campaignIndex].errors.push(error);
    } else if (pathList[2] === 'buttons') {
      const [, campaignIndex, attribute, buttonIndex] = pathList;
      if (!campaigns[campaignIndex][attribute][buttonIndex].errors) {
        campaigns[campaignIndex][attribute][buttonIndex].errors = [];
      }
      campaigns[campaignIndex][attribute][buttonIndex].errors.push(error);
    }
  });

  return res.render('campaignCreate', {
    title: 'Create campaigns',
    canals,
    campaigns,
    errors: globalErrors,
  });
};

module.exports = validate;
