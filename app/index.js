// 系统自带
const path = require('path');

// koa 相关
const Koa = require('koa');
const views = require('koa-views');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser')();
const json = require('koa-json')();

const app = new Koa();

// 自创
const router = require('./router');
const config = require('../config/dev');

// 中间件
const bind_req_helper = require('./middlewares/bind_req_helper');

// app.use(async (ctx, next) => {
//   console.log('111')
//   await next();
//   console.log('111222')
// });

app.use(logger());
app.use(bodyparser);
app.use(json);
app.use(views(config.template.path, config.template.options));
app.use(require('koa-static')(config.resources.root));

app.use(bind_req_helper());

router(app);

// 在端口3000监听:
app.listen(6666);
console.log('app started at port 6666...');
