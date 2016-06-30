/**
 * Created by root on 16-3-17.
 */
var gulp = require('gulp');
var gulpif = require('gulp-if');

var importcss = require('gulp-import-css');
var minifycssOptions = require('../options.config').minifyOptions;
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css');


function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + params.context.dir;
    var isProduction = (params.context.env === 'production');
    var sources = [];

    if (isProduction) {
        sources = [
            appDir + 'resources/assets/src/main.min.css',
            appDir + 'resources/assets/src/main.base.min.css',
            appDir + 'resources/assets/src/main-ie.min.css',
            appDir + 'resources/assets/src/main.base-ie.min.css',
            appDir + 'resources/assets/src/main.min.js',
            appDir + 'resources/assets/src/main-ie.min.js',
            appDir + 'resources/assets/src/main.base.min.js',
            appDir + 'resources/assets/src/main.base-ie.min.js'
        ];
    } else {
        sources = [
            appDir + 'resources/assets/src/main.css',
            appDir + 'resources/assets/src/main.base.css',
            appDir + 'resources/assets/src/main-ie.css',
            appDir + 'resources/assets/src/main.base-ie.css',
            appDir + 'resources/assets/src/main.js',
            appDir + 'resources/assets/src/main-ie.js',
            appDir + 'resources/assets/src/main.base.js',
            appDir + 'resources/assets/src/main.base-ie.js'
        ];
    }

    return gulp.src(sources).pipe(gulp.dest(destDir));
}

module.exports = task;
