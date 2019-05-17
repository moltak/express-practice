'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    contents: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    Post.hasMany(models.Comment)
  };
  return Post;
};