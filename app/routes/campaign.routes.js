module.exports = () => {
  const { Router } = require('express');

  const campaigns = require('../controllers/campaign.controller');
  const convertCampaign = require('../middlewares/convertCampaign');
  const validate = require('../middlewares/validators');
  const campaignValidationRules = require('../middlewares/validators/campaignValidationRules');

  const router = Router();

  router.get('/create', campaigns.createGet);
  router.post(
    '/create',
    convertCampaign,
    validate(campaignValidationRules),
    campaigns.createPost
  );
  router.get('/', campaigns.list);
  router.get('/:id', campaigns.retrieve);

  return router;  
};