const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Artist = sequelize.define(
  'Artist',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    artist_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'artists',
    paranoid: true,
  }
);

module.exports = Artist;
