const router = require('koa-router')();
const homepage = require('../controllers/homepage')


router.get('/', homepage.index);

module.exports = function routes(app) {
  app
    .use(router.routes())
    .use(router.allowedMethods());
};