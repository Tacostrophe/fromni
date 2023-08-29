const db = require('../../models');

exports.create = async (req, res) => {
  const reqCampaigns = req.body.campaigns;

  const { campaigns, buttons } = await reqCampaigns.reduce(async(acc, curr) => {
    const canal = await db.canals.findOne({ where: { name: curr.canal } });
    const accP = await acc;
    const campaign = {
      canalId: canal.id,
      message: curr.message,
      keyboard_type: curr.keyboard,
    };
    const buttons = curr.buttons ? curr.buttons : [];
    return {
      campaigns: [...accP.campaigns, campaign],
      buttons: [...accP.buttons, buttons],
    };
  }, {campaigns: [], buttons: []});
  
  console.log(campaigns);
  console.log(buttons);
  const newCampaigns = await db.campaigns.bulkCreate(campaigns);
  for(let i=0; i < newCampaigns.length; i++) {
    if (buttons[i].length) {
      buttons[i].forEach((button) => {
        button['campaignId'] = newCampaigns[i].id
      });
    }
  }
  console.log(buttons);
  await db.buttons.bulkCreate(buttons.flat());
  newCampaigns.forEach(async(newCampaign) => {
    newCampaign['dataValues']['buttons'] = await db.buttons.findAll({ where: {campaignId: newCampaign.id}});
  });
  res.send(newCampaigns);
};

exports.list = async (req, res) => {
  const campaigns = await db.campaigns.findAll({
    include: 'buttons',
  });
  res.send(campaigns);
};

exports.retrieve = async (req, res) => {
  const id = req.params.id;

  const campaign = await db.campaigns.findByPk(id, {
    include: 'buttons',
  });
  res.send(campaign);
};
