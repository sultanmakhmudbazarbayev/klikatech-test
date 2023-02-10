const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Song = sequelize.define(
  'Song',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    song: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    year: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    artist_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    genre_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'songs',
    paranoid: true,
  }
);

module.exports = Song;
