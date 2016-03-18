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

    var isProduction = (params.context.env === 'production');

    gulp.src([appDir + 'resources/assets/src/main.css',
            appDir + 'resources/assets/src/main.base.css',
            appDir + 'resources/assets/src/main-ie.css',
            appDir + 'resources/assets/src/main.base-ie.css'])
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(importcss())
        .pipe(gulpif(! isProduction, gulp.dest(appDir + 'public/dist')))
        .pipe(gulpif(isProduction, rename({suffix: '.min'})))
        .pipe(gulpif(isProduction, minifycss(minifycssOptions)))
        .pipe(gulpif(isProduction, gulp.dest(appDir + 'public/dist')));

    return gulp.src([appDir + 'resources/assets/src/main.js',
                    appDir + 'resources/assets/src/main-ie.js',
                    appDir + 'resources/assets/src/main.base.js',
                    appDir + 'resources/assets/src/main.base-ie.js'])
        .pipe(gulpif(! isProduction, jshint(params.context.appDir + '.jshintrc')))
        .pipe(gulpif(! isProduction, jshint.reporter('default')))
        .pipe(gulpif(isProduction, rename({suffix: '.min'})))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulp.dest(appDir + '/public/dist'));


}

module.exports = task;
