const validate = require('../../middlewares/validators');
const campaignValidationRules = require('../../middlewares/validators/campaignValidationRules');
const { body } = require('express-validator');

module.exports = () => {
  const campaigns = require('../../controllers/api/api.campaign.controller');
  const { Router } = require('express');

  const router = Router();

  router.post(
    '/',
    validate(campaignValidationRules),
    campaigns.create
  );
  router.get('/', campaigns.list);
  router.get('/:id', campaigns.retrieve);

  return router;  
};