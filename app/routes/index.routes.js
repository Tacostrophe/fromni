module.exports = () => {
  const { index } = require('../controllers/index.controller');
  const { Router } = require('express');

  const router = Router();

  router.get('/', index);
  
  return router;  
};