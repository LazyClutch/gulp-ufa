/**
 * Created by root on 16-3-16.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var importcss = require('gulp-import-css');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var minifycssOptions = {compatibility: 'ie7,ie8,+properties.iePrefixHack,+properties.ieSuffixHack,+colors.opacity'};

function task(cb, params) {
    var appDir = params.app + '/';

    gulp.src([
            appDir + 'resources/assets/src/base.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest(appDir + 'public/www'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(appDir + 'public/dist'));
    gulp.src([
            appDir + 'resources/assets/src/base-ie.js'
        ])
        .pipe(gulp.dest(appDir + 'public/www'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(appDir + 'public/dist'));
    gulp.src([
            appDir + 'resources/assets/src/base-ie.css'
        ])
        // .pipe(sass({ style: 'expanded' }))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(appDir + 'public/www'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(appDir + 'public/dist'));
    return gulp.src([
            appDir + 'resources/assets/src/base.css'
        ])
        // .pipe(sass({ style: 'expanded' }))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(appDir + 'public/www'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(appDir + 'public/dist'));
}

module.exports = task;