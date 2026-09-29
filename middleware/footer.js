const cms = require('../services/cms');

let cache = { data: null, at: 0 };
const TTL = 5 * 60 * 1000;

module.exports = async function footerData(req, res, next) {
  try {
    if (!cache.data || Date.now() - cache.at > TTL) {
      cache = { data: await cms.getFooter(), at: Date.now() };
    }
    res.locals.footer = cache.data;
  } catch (err) {
    res.locals.footer = cache.data || { categories: [], latest_articles: [] };
  }
  next();
};