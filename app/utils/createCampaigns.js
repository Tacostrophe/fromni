const db = require('../models');

async function createCampaign (req) {
  const reqCampaigns = req.body.campaigns;

  const { campaigns, buttons, canals } = await reqCampaigns.reduce(async(acc, curr) => {
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
      canals: [...accP.canals, canal],
    };
  }, {campaigns: [], buttons: [], canals: []});

  const newCampaigns = await db.campaigns.bulkCreate(campaigns);
  for(let i=0; i < newCampaigns.length; i++) {
    if (buttons[i].length) {
      buttons[i].forEach((button) => {
        button.campaignId = newCampaigns[i].id
      });
    }
  }
  const newButtons = await db.buttons.bulkCreate(buttons.flat());
  let campaignButtons
  newCampaigns.forEach((newCampaign) => {
    campaignButtons = newButtons.filter((newButton) => newButton.campaignId == newCampaign.id);
    if (campaignButtons.length > 0) {
      newCampaign.dataValues.buttons = campaignButtons;
    }

    newCampaign.dataValues.canal = (canals.find((canal) => {
      return newCampaign.canalId == canal.id;
    })).name;
    
  });
  return newCampaigns;
};

module.exports = createCampaign;