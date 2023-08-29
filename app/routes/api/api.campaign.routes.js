const validate = require('../../middlewares/validators');
const campaignValidationRules = require('../../middlewares/validators/campaignValidator');

module.exports = () => {
  const campaigns = require('../../controllers/api/api.campaign.controller');
  const { Router } = require('express');

  const router = Router();

  router.post(
    '/',
    // campaignValidationRules,
    // validate,
    campaigns.create
  );
  router.get('/', campaigns.list);
  router.get('/:id', campaigns.retrieve);

  return router;  
};