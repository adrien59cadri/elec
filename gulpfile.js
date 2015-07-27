'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');


gulp.task('lint', function() {
  return gulp.src(['./ui/*.js','index.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});