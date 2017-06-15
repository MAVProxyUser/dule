module.exports = {
  async index(ctx, next) {
    const req = ctx.request;
    await req.render_views('about/index.pug' ,{
      page_type: 'about',
      feature_nav: 'index',
    });
  },

  async speech(ctx, next) {
    const req = ctx.request;
    await req.render_views('about/speech.pug' ,{
      page_type: 'about',
      feature_nav: 'speech',
    });
  },

  async managers(ctx, next) {
    const req = ctx.request;
    await req.render_views('about/managers.pug' ,{
      page_type: 'about',
      feature_nav: 'managers',
    });
  },

  async development(ctx, next) {
    const req = ctx.request;
    await req.render_views('about/development.pug' ,{
      page_type: 'about',
      feature_nav: 'development',
    });
  },

  async honors(ctx, next) {
    const req = ctx.request;
    await req.render_views('about/honors.pug' ,{
      page_type: 'about',
      feature_nav: 'honors',
    });
  },
}

