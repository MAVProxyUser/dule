module.exports = {
  async index(ctx, next) {
    const req = ctx.request;
    await req.render_views('culture/index.pug' ,{
      page_type: 'culture',
      feature_nav: 'index',
    });
  },

  async news(ctx, next) {
    const req = ctx.request;
    await req.render_views('culture/news.pug' ,{
      page_type: 'culture',
      feature_nav: 'news',
    });
  },

  async spirit(ctx, next) {
    const req = ctx.request;
    await req.render_views('culture/spirit.pug' ,{
      page_type: 'culture',
      feature_nav: 'spirit',
    });
  },

}

