'use strict';
const table = 'artists';
const data = require('../seeders-data/artists');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      table,
      data.map((item) => {
        return {
          id: item.id,
          artist_name: item.artist_name,
        };
      })
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  },
};
