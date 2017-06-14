const router = require('koa-router')();
const homepage = require('../controllers/homepage')
const about = require('../controllers/about')

router.get('/', homepage.index);
router.get('/about', about.index);
router.get('/speech', about.speech);
router.get('/managers', about.managers);
router.get('/development', about.development);
router.get('/honors', about.honors);

module.exports = function routes(app) {
  app
    .use(router.routes())
    .use(router.allowedMethods());
};