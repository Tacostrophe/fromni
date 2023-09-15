const { Router } = require('express');

const campaigns = require('../controllers/campaign.controller');
const validate = require('../middlewares/validators');
const campaignValidationRules = require('../middlewares/validators/campaignValidationRules');

module.exports = () => {
  const router = Router();

  router.get('/create', campaigns.createGet);
  router.post(
    '/create',
    validate(campaignValidationRules),
    campaigns.createPost,
  );
  router.get('/', campaigns.list);
  router.get('/:id', campaigns.retrieve);

  return router;
};
