const asyncHandler = require('express-async-handler');
const createCampaigns = require('../utils/createCampaigns');
const db = require('../models');

exports.createGet = asyncHandler(async (req, res) => {
  const canalObjects = await db.canals.findAll({
    attributes: ['name'],
  });
  const canals = canalObjects.reduce((acc, curr) => [...acc, curr.name], []);

  res.render('campaignCreate', {
    title: 'Create campaigns',
    canals,
  });
});

exports.createPost = asyncHandler(async (req, res) => {
  const campaigns = await createCampaigns(req);

  res.render('index', {
    title: 'Created',
    message: 'Campaigns created',
    campaigns,
  });
});

exports.list = asyncHandler(async (req, res) => {
  const campaigns = await db.campaigns.findAll({
    include: ['canal', 'buttons'],
    order: [
      ['updatedAt', 'DESC'],
      ['id', 'DESC'],
    ],
  });
  res.render('campaignsList', {
    title: 'List of campaigns',
    campaigns,
  });
});

exports.retrieve = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const campaign = await db.campaigns.findByPk(id, {
    include: ['canal', 'buttons'],
  });
  res.render('campaign', { campaign });
});
