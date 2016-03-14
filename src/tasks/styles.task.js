var gulp = require('gulp');
var gulpif = require('gulp-if');

var importcss = require('gulp-import-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var minifycssOptions = require('../options.config').minifyOptions;

function task(cb, params) {
    var appDir = './' + params.app + '/';
    var destDir = appDir + params.context.dir + 'css';

    var isProduction = (params.context.env === 'production');

    return gulp.src(appDir + 'resources/assets/src/css/**/*.css')
//        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(importcss())
        .pipe(gulpif(! isProduction, gulp.dest(destDir)))
        .pipe(gulpif(isProduction, rename({suffix: '.min'})))
        .pipe(gulpif(isProduction, minifycss(minifycssOptions)))
        .pipe(gulpif(isProduction, gulp.dest(destDir)));
}


module.exports = task;