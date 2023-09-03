const db = require('../models');
const asyncHandler = require('express-async-handler');

exports.createGet = asyncHandler(async(req, res) => {
  const canalObjects = await db.canals.findAll({
    attributes: ['name'],
  });
  const canals = canalObjects.reduce((acc, curr) => [...acc, curr.name], []);
  res.render('campaignCreate', {
    title: 'Create campaigns',
    canals: canals,
  });
});

exports.createPost = asyncHandler(async(req, res) => {
  const canalObjects = await db.canals.findAll({
    attributes: ['name'],
  });
  const canals = canalObjects.reduce((acc, curr) => [...acc, curr.name], []);
  res.render('campaignCreate', {
    title: 'Create campaigns',
    canals: canals,
    lastCanal: req.body.canal,
    message: req.body.message,
    lastKeyboard: req.body.keyboard,
    tests: ['one', 'two', 'three'],
  });
});

exports.list = asyncHandler(async (req, res) => {
  const campaigns = await db.campaigns.findAll({
    include: 'canal',
    order: [
      ['updatedAt', 'DESC'],
      ['id', 'DESC'],
    ],
  });
  res.render("campaignsList", { campaigns: campaigns });
});

exports.retrieve = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const campaign = await db.campaigns.findByPk(id, {
    include: ['canal', 'buttons'],
  });
  res.render("campaign", {campaign});
});
