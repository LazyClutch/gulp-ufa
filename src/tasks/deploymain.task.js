var gulp = require('gulp');
var gulpif = require('gulp-if');

var importcss = require('gulp-import-css');
var minifycssOptions = require('../options.config').minifyOptions;

var rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css');


function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + params.context.dir;

    var isProduction = (params.context.env === 'production');

    gulp.src([
            appDir + 'resources/assets/src/main.dist.js'
        ])
        .pipe(rename('main.js'))
        .pipe(gulpif(! isProduction, gulp.dest(destDir)))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulpif(isProduction, gulp.dest(destDir)));

    // Script IE
    gulp.src([
            appDir + 'resources/assets/src/main-ie.dist.js'
        ])
        .pipe(rename('main-ie.js'))
        .pipe(gulpif(! isProduction, gulp.dest(destDir)))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulpif(isProduction, gulp.dest(destDir)));

    gulp.src([
            appDir + 'resources/assets/src/main.dist.css'
        ])
//        .pipe(sass({ style: 'expanded' }))
        .pipe(rename('main.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulpif(! isProduction, gulp.dest(destDir)))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpif(isProduction, minifycss(minifycssOptions)))
        .pipe(gulpif(isProduction, gulp.dest(destDir)));

    // Style IE
    return gulp.src([
            appDir + 'resources/assets/src/main-ie.dist.css'
        ])
//        .pipe(sass({ style: 'expanded' }))
        .pipe(rename('main-ie.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulpif(! isProduction, gulp.dest(destDir)))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpif(isProduction, minifycss(minifycssOptions)))
        .pipe(gulpif(isProduction, gulp.dest(destDir)));
}

module.exports = task;