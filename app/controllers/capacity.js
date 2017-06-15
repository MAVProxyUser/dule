module.exports = {
  async index(ctx, next) {
    const req = ctx.request;
    await req.render_views('capacity/index.pug' ,{
      page_type: 'capacity',
      feature_nav: 'index',
    });
  },

  async engineer(ctx, next) {
    const req = ctx.request;
    await req.render_views('capacity/engineer.pug' ,{
      page_type: 'capacity',
      feature_nav: 'engineer',
    });
  },

  async quality(ctx, next) {
    const req = ctx.request;
    await req.render_views('capacity/quality.pug' ,{
      page_type: 'capacity',
      feature_nav: 'quality',
    });
  },

}

