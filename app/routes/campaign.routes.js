module.exports = app => {
  const campaigns = require('../controllers/campaign.controller');
  const { Router } = require('express');

  const router = Router();

  router.post('/', campaigns.create);
  router.get('/', campaigns.get);
}