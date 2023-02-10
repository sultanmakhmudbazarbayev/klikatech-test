'use strict';
const table = 'genres';
const data = require('../seeders-data/genres');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      table,
      data.map((item) => {
        return {
          id: item.id,
          genre: item.genre,
        };
      })
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  },
};
