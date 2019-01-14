'use strict';
module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define('Url', {
    url: DataTypes.STRING,
    reactions: DataTypes.STRING,
    shares: DataTypes.STRING,
    comments: DataTypes.STRING,
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Url.associate = function(models) {
    // associations can be defined here
  };
  return Url;
};
