const path = require('path');

const env = process.env;


module.exports = {
  app: {
    name: `Kings Landing (${env.NODE_ENV})`,
  },
  resources: {
    root: path.resolve('.tmp/public'),
  },
  server: {
    port: 6666,
  },
  logs: {
    path: path.resolve('logs'),
    exceptions: path.resolve('logs'),
    logname: `logstash_kings-landing-${env.NODE_ENV}`,
    exceptionsName: `logstash_kings-landing-exceptions-${env.NODE_ENV}`,
  },
  template: {
    path: 'views',
    options: {
      map: {
        html: 'lodash',
        haml: 'haml',
        pug: 'pug',
      },
      extension: 'pug',
    },
  },
  session: {
    secretKey: '55ff6ae0c3ad0cc8e5ef261cde53086e',
  },
};
