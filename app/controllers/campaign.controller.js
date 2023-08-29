const db = require('../models');

exports.create = (req, res) => {
  res.render("index", {title: 'Welcome'});
};

exports.list = async (req, res) => {
  const campaigns = await db.campaigns.findAll({
    include: 'canal',
    order: [
      ['updatedAt', 'DESC'],
      ['id', 'DESC'],
    ],
  });
  res.render("campaignsList", { campaigns: campaigns });
};

exports.retrieve = async (req, res) => {
  const id = req.params.id;

  const campaign = await db.campaigns.findByPk(id, {
    include: ['canal', 'buttons'],
  });
  res.render("campaign", {campaign});
};
