'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Posts',
      'UserId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'Comments',
        'UserId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'Comments',
        'PostId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Posts',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Posts',
      'UserId'
    )
    .then(() => {
      return queryInterface.removeColumn(
        'Comments',
        'UserId'
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Comments',
        'PostId'
      )
    })
  }
};
