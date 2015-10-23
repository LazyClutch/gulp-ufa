var gulp = require('gulp');
var importcss = require('gulp-import-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + 'resources/assets/src/';
    var bowerDir = params.bowerDir + '/';
    var notify = require('gulp-notify');

    /* Main Javascript file. */
    // not IE
    gulp.src([
        bowerDir + 'jquery/dist/jquery.min.js',
        destDir + 'common/common.js'
    ])
        .pipe(concat('main.dist.js'))
        .pipe(gulp.dest(destDir))
        .pipe(notify({message: 'Main Scripts (not IE) concat task complete'}));

    // IE
    gulp.src([
        bowerDir + 'jquery-legacy/dist/jquery.min.js',
        destDir + 'common/common.js'
    ])
        .pipe(concat('main-ie.dist.js'))
        .pipe(gulp.dest(destDir))
        .pipe(notify({message: 'Main Scripts (IE) concat task complete'}));

    /* Main css file. */
    return gulp.src([
        destDir + 'css/ui/dist/*.css',
        destDir + 'css/uicrm/*.css'
    ])
        .pipe(concat('main.dist.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(destDir))
        .pipe(notify({message: 'Main Styles concat task complete'}));

}

module.exports = task;
