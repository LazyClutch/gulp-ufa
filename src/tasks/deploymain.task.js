var gulp = require('gulp');
var importcss = require('gulp-import-css');
var minifycssOptions = {compatibility: 'ie7,ie8,+properties.iePrefixHack,+properties.ieSuffixHack,+colors.opacity'};

var rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css');


function task(cb, params) {
    var appDir = params.app + '/';

    gulp.src([
            appDir + 'resources/assets/src/main.dist.js'
        ])
        .pipe(rename('main.js'))
        .pipe(gulp.dest(appDir + 'public'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(appDir + 'public/dist'));

    // Script IE
    gulp.src([
            appDir + 'resources/assets/src/main-ie.dist.js'
        ])
        .pipe(rename('main-ie.js'))
        .pipe(gulp.dest(appDir + 'public'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(appDir + 'public/dist'));

    gulp.src([
            appDir + 'resources/assets/src/main.dist.css'
        ])
//        .pipe(sass({ style: 'expanded' }))
        .pipe(rename('main.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(appDir + 'public'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(appDir + 'public/dist'));

    // Style IE
    gulp.src([
            appDir + 'resources/assets/src/main-ie.dist.css'
        ])
//        .pipe(sass({ style: 'expanded' }))
        .pipe(rename('main-ie.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(appDir + 'public'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(appDir + 'public/dist'));
}

module.exports = task;