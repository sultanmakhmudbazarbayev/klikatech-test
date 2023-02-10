'use strict';
const table = 'songs';
const data = require('../seeders-data/songs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      table,
      data.map((item) => {
        return {
          song: item.song,
          year: item.year,
          artist_id: item.artist_id,
          genre_id: item.genre_id,
        };
      })
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  },
};
