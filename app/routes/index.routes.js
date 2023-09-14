const { Router } = require('express');
const { index } = require('../controllers/index.controller');

module.exports = () => {
  const router = Router();

  router.get('/', index);

  return router;
};
