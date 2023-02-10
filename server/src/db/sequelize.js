const { Sequelize } = require('sequelize');

console.log(process.env.PG_HOST)
const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    dialectOptions: {
      useUTC: false,
    },
  }
);

module.exports = sequelize;
