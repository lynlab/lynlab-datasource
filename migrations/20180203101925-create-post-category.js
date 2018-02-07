'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostCategories', {
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
      queryInterface.addColumn('Posts', 'postCategoryId', {
        type: Sequelize.INTEGER,
        reference: 'PostCategories',
        referenceKey: 'id',
      });
    }).then(() => {
      queryInterface.addColumn('Posts', 'summary', Sequelize.TEXT);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PostCategories').then(() => {
      queryInterface.removeColumn('Posts', 'postCategoryId');
    });
  },
};