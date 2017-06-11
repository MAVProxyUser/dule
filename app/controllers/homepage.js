module.exports = {
  async index(ctx, next) {
    await ctx.render('homepage/index.pug',{});
  }
}