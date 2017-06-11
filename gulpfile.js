'use strict';

var gulp = require('gulp');
var mkdirp = require('mkdirp');

//=====获取环境参数 like gulp task --product name,
//=====and you can get product
var argv = require('optimist').argv;

// global.settings = require('./config/application').application;
// global.helper = require('./helper/global').bind({});
// global.API = require('./services/API');
// global.Monitor = require('./services/Monitor');

// var bootstrap = require('./config/bootstrap').bootstrap;

var tasks = []; //gulp tasks

tasks = ['gulp-watch'];

(function loadTasks() {
  tasks.forEach(function (task) {
    require('./gulp-task/' + task)(gulp);
  });
}());


module.exports = gulp;
