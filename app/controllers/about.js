module.exports = {
  async index(ctx, next) {
    await ctx.render('about/index.pug',{});
  },

  async speech(ctx, next) {
    await ctx.render('about/speech.pug',{});
  },

  async managers(ctx, next) {
    await ctx.render('about/managers.pug',{});
  },

  async development(ctx, next) {
    await ctx.render('about/development.pug',{});
  },

  async honors(ctx, next) {
    await ctx.render('about/honors.pug',{});
  },
}

