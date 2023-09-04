const db = require('../models');

async function populateDB() {
  const KEYBOARDS = {
    vkontakte: [
      {
        type: 'standard',
        button_max_amount: 40,
        link_button_amount: 'infinity',
      },
      {
        type: 'inline',
        button_max_amount: 10,
        link_button_amount: 'infinity',
      },
    ],
    whatsapp: [
      {
        type: 'standard',
        button_max_amount: 10,
        button_message_max_length: 20,
        link_button_amount: 0,
      },
      {
        type: 'inline',
        button_max_amount: 3,
        button_message_max_length: 20,
        link_button_amount: 1,
      },
    ],
    telegram: [
      {
        type: 'standard',
        link_button_amount: 0,
      },
      {
        type: 'inline',
        button_message_length: 64,
        link_button_amount: 'infinity',
      },
    ],
    sms: [
      {
        type: 'standard',
        button_max_amount: 0,
        button_message_max_length: 0,
        link_button_amount: 0,
      },
      {
        type: 'inline',
        button_max_amount: 0,
        button_message_max_length: 0,
        link_button_amount: 0,
      },
    ],
  };

  const CANALS = [
    {
      name: 'vkontakte',
      message_max_length: 4096,
    },
    {
      name: 'whatsapp',
      message_max_length: 1000,
    },
    {
      name: 'telegram',
      message_max_length: 4096,
    },
    {
      name: 'sms',
    },
  ];

  let keyboards;
  let keyboardStandard;
  let keyboardInline;
  let canal;
  await CANALS.reduce(async(promise, currentCanal) => {
    await promise;
    keyboards = await db.keyboards.bulkCreate(KEYBOARDS[currentCanal.name]);
    keyboardStandard = keyboards.find((keyboard) => keyboard.type == 'standard');
    keyboardInline = keyboards.find((keyboard) => keyboard.type == 'inline');
    currentCanal.keyboardInlineId = keyboardInline.id;
    currentCanal.keyboardStandardId = keyboardStandard.id;
    console.log(currentCanal);
    await db.canals.create(currentCanal);
  }, Promise.resolve());
}

module.exports = populateDB;
