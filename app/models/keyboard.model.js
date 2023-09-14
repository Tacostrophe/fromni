module.exports = (sequelize, Sequelize) => {
  const Keyboard = sequelize.define('keyboard', {
    type: {
      type: Sequelize.STRING,
      validate: {
        is: /^(?:standard|inline)$/,
      },
    },
    button_max_amount: {
      type: Sequelize.NUMERIC,
    },
    button_message_max_length: {
      type: Sequelize.INTEGER,
    },
    link_button_amount: {
      type: Sequelize.NUMERIC,
    },
  }, {
    timestamps: false,
  });

  return Keyboard;
};
