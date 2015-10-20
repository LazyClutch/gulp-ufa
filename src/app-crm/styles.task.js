var gulp = require('gulp');

var importcss = require('gulp-import-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var minifycssOptions = require('../options.config').minifyOptions;
var crmOptions = require('./config').crmOptions;

function task(cb, params) {
    var appDir = './' + params.app + '/';
    var builtRootDir = crmOptions.builtRootDir;

    return gulp.src(appDir + 'resources/assets/src/css/**/*.css')
//        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(importcss())
        .pipe(gulp.dest(appDir + builtRootDir + 'css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(appDir + builtRootDir + 'dist/css'));
}


module.exports = task;