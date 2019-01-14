/**
 * Database (SQlite+Sequelize) configuration file
 */
const Sequelize = require('sequelize');

module.exports = new Sequelize('database', 'username', 'password', {
    host: '127.0.0.1',
    dialect: 'sqlite',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
