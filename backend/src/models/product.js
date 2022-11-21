'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    categoryId: DataTypes.INTEGER
  }, {});
  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};