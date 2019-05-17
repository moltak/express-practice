'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    contents: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
  };
  return Comment;
};