'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostSeries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }).then(() => {
      queryInterface.addColumn('Posts', 'hitCount', Sequelize.INTEGER);
    }).then(() => {
      queryInterface.addColumn('Posts', 'postSeriesId', {
        type: Sequelize.INTEGER,
        reference: 'PostSeries',
        referenceKey: 'id',
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Posts', 'postSeriesId')
      .then(() => queryInterface.removeColumn('Posts', 'hitCount'))
      .then(() => queryInterface.dropTable('PostSeries'));
  }
};
