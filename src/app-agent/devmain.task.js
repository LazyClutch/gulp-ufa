var gulp = require('gulp');
var importcss = require('gulp-import-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + 'resources/assets/src';
    var notify = require('gulp-notify');

    /* Main Javascript file. */
    // not IE
    gulp.src([
            './resources/bower/jquery/dist/jquery.min.js',
            './resources/bower/bootstrap/dist/js/bootstrap.min.js',
            './resources/assets/src/main.js'
        ])
        .pipe(concat('main.dist.js'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main Scripts (not IE) concat task complete'}));

    // IE
    gulp.src([
            './resources/bower/html5shiv/dist/html5shiv.min.js',
            './resources/bower/respond/dest/respond.min.js',
            './resources/bower/jquery-legacy/dist/jquery.min.js',
            './resources/bower/bootstrap/dist/js/bootstrap.min.js',
            './resources/assets/src/main.js'
        ])
        .pipe(concat('main-ie.dist.js'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main Scripts (IE) concat task complete'}));

    /* Main css file. */
    return gulp.src([
            './resources/bower/bootstrap/dist/css/bootstrap.min.css',
            './resources/assets/src/main.css'
        ])
//        .pipe(sass({ style: 'expanded' }))
        .pipe(concat('main.dist.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main Styles concat task complete'}));

}

module.exports = task;