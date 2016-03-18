/**
 * Created by root on 16-3-17.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var minifycssOptions = require('../options.config').minifyOptions;

function task(cb, params) {

    var appDir = params.app+ '/';
    var destDir = appDir + 'resources/assets/src/lib';
console.log(appDir);
    // uploadify
    gulp.src(appDir + 'resources/bower/uploadify/*')
        .pipe(gulp.dest(destDir + '/uploadify'))
    gulp.src(appDir + 'resources/bower/uploadify/uploadify.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + '/uploadify'))


    // jquery-file-upload
    gulp.src(appDir + 'resources/bower/jquery-file-upload/js/**/*.js')
        .pipe(gulp.dest(destDir + '/jquery-file-upload/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/jquery-file-upload/js'))
    gulp.src(appDir + 'resources/bower/jquery-file-upload/css/*.css')
        .pipe(gulp.dest(destDir + '/jquery-file-upload/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + '/jquery-file-upload/css'))
    gulp.src(appDir + 'resources/bower/jquery-file-upload/img/*')
        .pipe(gulp.dest(destDir + '/jquery-file-upload/img'))

    //autocomplete
    gulp.src([
        appDir + 'resources/bower/jquery-ui/ui/core.js',
        appDir + 'resources/bower/jquery-ui/ui/widget.js',
        appDir + 'resources/bower/jquery-ui/ui/position.js',
        appDir + 'resources/bower/jquery-ui/ui/menu.js',
        appDir + 'resources/bower/jquery-ui/ui/autocomplete.js'
    ]).pipe(concat('search.box.js'))
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));

    // jquery-form-validator
    gulp.src(appDir + 'resources/bower/jquery-form-validator/form-validator/*')
        .pipe(gulp.dest(destDir + '/jquery-form-validator'))

    // jquery datetimepicker
    gulp.src(appDir + 'resources/bower/datetimepicker/*.js')
        .pipe(gulp.dest(destDir + '/datetimepicker'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/datetimepicker'))

    return gulp.src(appDir + 'resources/bower/datetimepicker/*.css')
        .pipe(gulp.dest(destDir + '/datetimepicker'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + '/datetimepicker'));

}

module.exports = task;