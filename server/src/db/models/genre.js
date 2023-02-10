const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Genre = sequelize.define(
  'Genre',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    genre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'genres',
    paranoid: true,
  }
);

module.exports = Genre;
