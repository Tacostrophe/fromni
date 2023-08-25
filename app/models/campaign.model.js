module.exports = (sequelize, Sequelize) => {
  const Campaign = sequelize.define('campaign', {
    keyboard_type: {
      type: Sequelize.STRING,
      validate: {
        is: /^(?:standard|inline)$/,
      }
    },
    message: {
      type: Sequelize.STRING,
    },
  })

  return Campaign;  
};