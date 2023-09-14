module.exports = (sequelize, Sequelize) => {
  const Button = sequelize.define('button', {
    type: {
      type: Sequelize.STRING,
      validate: {
        is: /^(?:answer|link)$/,
      },
    },
    text: {
      type: Sequelize.STRING,
    },
    tag: {
      type: Sequelize.STRING,
    },
  }, {
    timestamps: false,
  });

  return Button;
};
