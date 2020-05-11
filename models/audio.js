'use strict';
module.exports = (sequelize, DataTypes) => {
  const audio = sequelize.define('audio', {
    title: DataTypes.STRING,
    path: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {});
  audio.associate = function(models) {
    // associations can be defined here
  };
  return audio;
};