'use strict';

const { User, Post, Comment } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'DUMMY_USER_1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    const user = await User.findOne({})
    await queryInterface.bulkInsert('Posts', [
      {
        title: 'DUMMEY_POST_1',
        contents: 'DUMMY_POST_CONTENTS',
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    const post = await Post.findOne({})
    return queryInterface.bulkInsert('Comments', [
      {
        contents: 'DUMMY_COMMENTS_1',
        userId: user.id,
        postId: post.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Posts', null, {})
    return await queryInterface.bulkDelete('Comments', null, {})
  }
};
