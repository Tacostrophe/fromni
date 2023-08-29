module.exports = () => {
  const campaigns = require('../controllers/campaign.controller');
  const { Router } = require('express');

  const router = Router();

  router.post('/create', campaigns.create);
  router.get('/', campaigns.list);
  router.get('/:id', campaigns.retrieve);

  return router;  
};