module.exports = (sequelize, Sequelize) => {
  const Canal = sequelize.define('canal', {
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    message_max_length: {
      type: Sequelize.INTEGER,
    },
  }, {
    timestamps: false,
  });

  return Canal;
};
