const utils = {
  isAssets: path => /^\/(mobile\/)?(images|scripts|styles|fonts|favicon\.ico)/.test(path),
  isIgnored: path => /^\/kl-health-check/.test(path),
  isProductionEnv: () => process.env.NODE_ENV == 'development',
  isDevelopmentEnv: () => process.env.NODE_ENV == 'development'
}
module.exports = utils;