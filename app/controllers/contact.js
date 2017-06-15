module.exports = {
  async index(ctx, next) {
    const req = ctx.request;
    await req.render_views('contact/index.pug' ,{
      page_type: 'contact',
      feature_nav: 'index',
    });
  },

  async recruit(ctx, next) {
    const req = ctx.request;
    await req.render_views('contact/recruit.pug' ,{
      page_type: 'contact',
      feature_nav: 'recruit',
    });
  },

}

