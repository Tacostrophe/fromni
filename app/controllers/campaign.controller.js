const db = require('../models');

exports.create = async (req, res) => {
//   small validation
  if (!req.body.canal) {
    res.status(400).send({
      message: 'canal name is required',
    });
    return;
  }
  if (!req.body.keyboard) {
    res.status(400).send({
      message: 'keyboard type is required',
    });
    return;
  }

  const canal = await db.canals.findOne({ where: { name: req.body.canal } });
  const campaign = {
    canalId: canal.id,
    message: req.body.message,
    keyboard_type: req.body.keyboard,
  };

  const newCampaign = await db.campaigns.create(campaign);
  const buttons = req.body.buttons;
  if (buttons) {
    buttons.forEach((button) => {button['campaignId']=newCampaign.id});
    const newButtons = await db.buttons.bulkCreate(buttons);
  }
  newCampaign['dataValues']['buttons'] = buttons ?? [];
  res.send(newCampaign);
};

exports.get = async (req, res) => {
  const campaigns = await db.campaigns.findAll({
    include: 'buttons',
  });
  res.send(campaigns);
};
