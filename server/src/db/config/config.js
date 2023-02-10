console.log(process.env.PG_HOST);
console.log(process.env.PG_USER);
console.log(process.env.PG_DATABASE);
console.log(process.env.PG_PASSWORD);

module.exports = {
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: 35432,
    dialect: 'postgres',
  },
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: 5432,
    dialect: 'postgres',
  },
};
