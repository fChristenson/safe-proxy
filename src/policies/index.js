const fs = require("fs");

const files = fs.readdirSync(__dirname);

const policies = files
  .filter((file) => /\.json$/.test(file))
  .map((file) => require(`./${file}`));

/**
 * Each of these policies would have to go through many automated tests and reviews.
 * It is important that you validate that none of them create a security breach.
 */
module.exports = policies;
