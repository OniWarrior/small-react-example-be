const knex = require('knex')

const config = require('../../knex-file')

const environment = process.env.NODE_ENV

module.exports = knex(config[environment])