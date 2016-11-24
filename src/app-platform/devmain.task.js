var gulp = require('gulp');
var importcss = require('gulp-import-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var minifycssOptions = require('../options.config').minifyOptions;

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + 'resources/assets/src';

    gulp.src([
            appDir + 'resources/bower/jquery/dist/jquery.min.js',
            appDir + 'resources/assets/src/common/jQuery-ajaxTransport-XDomainRequest.js',
            appDir + 'resources/assets/src/common/common.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));

    // IE
    gulp.src([
            appDir + 'resources/bower/html5shiv/dist/html5shiv.min.js',
            appDir + 'resources/bower/respond/dest/respond.min.js',
            appDir + 'resources/bower/jquery-legacy/dist/jquery.min.js',
            appDir + 'resources/assets/src/common/jQuery-ajaxTransport-XDomainRequest.js',
            appDir + 'resources/assets/src/common/common.js'
        ])
        .pipe(concat('main-ie.js'))
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));

    /* Main css file. */
    gulp.src([
            appDir + 'resources/assets/src/main.css'
        ])
        // .pipe(sass({ style: 'expanded' }))
        .pipe(concat('main.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir));

    return gulp.src([
            appDir + 'resources/assets/src/main-ie.css'
        ])
        .pipe(concat('main-ie.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir));
}

module.exports = task;