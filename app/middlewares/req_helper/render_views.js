
// 绑定helper方法到pug中可以使用
module.exports = function (ctx) {
  return  async function(path, data = {}) {
    const helper = ctx.request.helper;
    let _data = Object.assign({}, helper, data);
    await ctx.render(path ,_data);
  }
};
