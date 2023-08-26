const db = require('../models');

exports.create = async (req, res) => {
//   small validation
  console.log (req.body);
  if (!req.body.canal) {
    res.status(400).send({
      message: 'canal name is required',
    });
  }
  if (!req.body.keyboard) {
    res.status(400).send({
      message: 'keyboard type is required',
    });
  }

  const canal = await db.canal.findOne({ where: { name: req.body.canal } });
//   buttons required
  const campaign = {
    canal: canal.id,
    message: req.body.message,
    keyboard_type: req.body.keyboard,
  }
};

exports.get = async (req, res) => {
  const campaigns = await db.campaigns.findAll();
  res.send(campaigns);
};
