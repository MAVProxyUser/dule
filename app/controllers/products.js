module.exports = {
  async optics(ctx, next) {
    const req = ctx.request;
    await req.render_views('products/products-list.pug' ,{
      page_type: 'products',
      feature_nav: 'optics',
    });
  },
  async lenses(ctx, next) {
    const req = ctx.request;
    await req.render_views('products/products-list.pug' ,{
      page_type: 'products',
      feature_nav: 'lenses',
    });
  },
  async lamp(ctx, next) {
    const req = ctx.request;
    await req.render_views('products/products-list.pug' ,{
      page_type: 'products',
      feature_nav: 'lamp',
    });
  },
  async robot(ctx, next) {
    const req = ctx.request;
    await req.render_views('products/products-list.pug' ,{
      page_type: 'products',
      feature_nav: 'robot',
    });
  },
  async toys(ctx, next) {
    const req = ctx.request;
    await req.render_views('products/products-list.pug' ,{
      page_type: 'products',
      feature_nav: 'toys',
    });
  },
}

