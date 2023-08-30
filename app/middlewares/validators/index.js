const { validationResult } = require('express-validator');

const validate = (validationRules) => {
  return async (req, res, next) => {
    await Promise.all(validationRules.map((rule) => rule.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    const errors = result.array();
    return res.status(400).json({
      message: 'Validation error',
      errors: errors,
    })
  };
};

module.exports = validate;