const credentials = require('./credentials.json');
credentials['host'] = process.env.DB_HOST || credentials['host'];
module.exports = credentials;
