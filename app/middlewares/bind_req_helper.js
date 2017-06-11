const utils = require('../../utils');
const helper_url = require('./req_helper/url');

module.exports = () => async (ctx, next) => {
  // 资源和可以忽略的API不需要经过此中间件
  const req = ctx.request;
  if (utils.isAssets(req.url) || utils.isIgnored(req.url)) {
    return await next();
  }
  
  let helper_url_list = helper_url(req);

  req.helper = {};
  for(var helper in helper_url_list) {
    if(req[helper]){
      req.helper[helper] = helper_url_list[helper];
    }else {
      req[helper] = req.helper[helper] = helper_url_list[helper];
    }
  }

  return await next();
}
