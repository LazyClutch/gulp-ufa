function task(cb, params) {
    if (params.context.env != 'dev') {
        return false;
    }

    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var importcss = require('gulp-import-css');
    var rename = require('gulp-rename');
    var autoprefixer = require('gulp-autoprefixer');
    var minifycss = require('gulp-minify-css');
    var minifycssOptions = require('../options.config').minifyOptions;

    var appDir = './' + params.app + '/';

    return gulp.src(appDir + 'resources/assets/src/sass/**/*.scss')
        .pipe(sass({style: 'expanded', errLogToConsole: true }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(importcss())
        .pipe(gulp.dest(appDir + 'resources/assets/src/css'))
        .pipe(gulp.dest('../' + appDir + 'dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest('../' + appDir + 'dist/css'));
}
module.exports = task;
