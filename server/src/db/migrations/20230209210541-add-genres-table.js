'use strict';

const table = 'genres';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      genre: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: 'TIMESTAMP',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.dropTable(table)]);
  },
};
