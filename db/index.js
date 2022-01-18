const db_config = require("../knexfile");
const db = require("knex")(db_config.development);
module.exports = db;
