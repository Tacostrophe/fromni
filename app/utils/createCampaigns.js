const db = require('../models');

async function createCampaign(req) {
  const reqCampaigns = req.body.campaigns;

  const { campaigns, buttonsOfCampaigns } = await reqCampaigns.reduce(async (acc, curr) => {
    const canal = await db.canals.findOne({ where: { name: curr.canal } });
    const accP = await acc;
    const campaign = {
      canalId: canal.id,
      message: curr.message,
      keyboard_type: curr.keyboard,
    };
    const currButtons = curr.buttons ? curr.buttons : [];
    return {
      campaigns: [...accP.campaigns, campaign],
      buttonsOfCampaigns: [...accP.buttonsOfCampaigns, currButtons],
    };
  }, {
    campaigns: [],
    buttonsOfCampaigns: [],
  });

  const newCampaigns = await db.campaigns.bulkCreate(campaigns);
  const buttons = [];
  for (let i = 0; i < newCampaigns.length; i += 1) {
    if (buttonsOfCampaigns[i].length) {
      buttonsOfCampaigns[i].forEach((button) => {
        buttons.push(button);
        buttons[buttons.length - 1].campaignId = newCampaigns[i].id;
      });
    }
  }
  await db.buttons.bulkCreate(buttons);
  return newCampaigns;
}

module.exports = createCampaign;
