var gulp = require('gulp');
var importcss = require('gulp-import-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

function task(cb, params) {    
    var appDir = params.app + '/';
    var destDir = appDir + 'resources/assets/src';

    gulp.src([
            appDir + 'resources/assets/bower/jquery/dist/jquery.min.js',
            appDir + 'resources/assets/src/common/common.js',
            appDir + 'resources/assets/src/common/ajax.js',
        ])
        .pipe(concat('main.dist.js'))
        .pipe(gulp.dest(destDir));

    /* Main css file. */
    return gulp.src([
            appDir + 'resources/assets/bower/foundation/css/foundation.css',
            appDir + 'resources/assets/src/main.css'
        ])
        .pipe(concat('main.dist.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(destDir));
}

module.exports = task;