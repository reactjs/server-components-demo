const pgp = require('pg-promise')()
const db = pgp(require('../credentials'))

module.exports = {pgp, db}
