// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

// no need to save dotenv to a variable, all we need is for this to execute when we use connection.js and all the data in .env will be made available
require('dotenv').config();

// create connection to our database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;