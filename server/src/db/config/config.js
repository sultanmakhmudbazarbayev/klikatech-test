console.log(process.env.PG_PASSWORD);
console.log(process.env.PG_USER);
console.log(process.env.PG_DATABASE);
console.log(process.env.PG_HOST);

module.exports = {
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
  },
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
  },
};
