const utils = require('../../utils');
const helper_url = require('./req_helper/url');
const render_views = require('./req_helper/render_views');
const common = require('./req_helper/common');

module.exports = () => async (ctx, next) => {
  // 资源和可以忽略的API不需要经过此中间件
  let req = ctx.request;
  if (utils.isAssets(req.url) || utils.isIgnored(req.url)) {
    return await next();
  }
  
  let helper_url_list = helper_url(req);
  let common_list = common(req);
  let helper_func_list = Object.assign({}, helper_url_list, common_list)
  req.helper = {};

  // 绑定 url helper 、 common（常用方法）
  for(var helper in helper_func_list) {
    if(req[helper]){
      req.helper[helper] = helper_func_list[helper];
    }else {
      req[helper] = req.helper[helper] = helper_func_list[helper];
    }
  }

  // 绑定 render views helper
  req.render_views = render_views(ctx);

  return await next();
}
