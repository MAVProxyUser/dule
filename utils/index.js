const utils = {
  isAssets: path => /^\/(mobile\/)?(images|scripts|styles|fonts|favicon\.ico)/.test(path),
  isIgnored: path => /^\/kl-health-check/.test(path)
}
module.exports = utils;