require("dotenv").config();

const { DB_URL, LOCAL_DB, JWT_KEY, MAIL, PASS } = process.env;

module.exports = { DB_URL, LOCAL_DB, JWT_KEY, MAIL, PASS };
