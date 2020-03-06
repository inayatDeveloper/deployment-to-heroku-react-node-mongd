const algoliasearch = require("algoliasearch"),
  algoliaClient = algoliasearch(process.env.APP_KEY, process.env.ADMIN_KEY);
module.exports = algoliaClient;
