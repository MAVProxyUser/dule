const router = require('koa-router')();
const homepage = require('../controllers/homepage')
const about = require('../controllers/about')
const capacity = require('../controllers/capacity')
const products = require('../controllers/products')
const culture = require('../controllers/culture')
const contact = require('../controllers/contact')

router.get('/', homepage.index);

router.get('/about', about.index);
router.get('/about/speech', about.speech);
router.get('/about/managers', about.managers);
router.get('/about/development', about.development);
router.get('/about/honors', about.honors);

router.get('/capacity', capacity.index);
router.get('/capacity/engineer', capacity.engineer);
router.get('/capacity/quality', capacity.quality);

router.get('/products/optics', products.optics);
router.get('/products/lenses', products.lenses);
router.get('/products/lamp', products.lamp);
router.get('/products/robot', products.robot);
router.get('/products/toys', products.toys);

router.get('/culture', culture.index);
router.get('/culture/news', culture.news);
router.get('/culture/spirit', culture.spirit);

router.get('/contact', contact.index);
router.get('/contact/recruit', contact.recruit);


module.exports = function routes(app) {
  app
    .use(router.routes())
    .use(router.allowedMethods());
};

