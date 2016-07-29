var gulp = require('gulp');
var rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css');
var minifycssOptions = require('../options.config').minifyOptions;

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + 'resources/assets/src/lib';

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

    // jcrop
    gulp.src(appDir + 'resources/bower/jcrop/js/*')
        .pipe(gulp.dest(destDir + '/jcrop/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/jcrop/js'))
    gulp.src(appDir + 'resources/bower/jcrop/css/*')
        .pipe(gulp.dest(destDir + '/jcrop/css'))

    // jquery-form-validator
    gulp.src(appDir + 'resources/bower/jquery-form-validator/form-validator/*')
        .pipe(gulp.dest(destDir + '/jquery-form-validator'))

    // jquery datetimepicker
    gulp.src(appDir + 'resources/bower/datetimepicker/*.js')
        .pipe(gulp.dest(destDir + '/datetimepicker'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/datetimepicker'))

    gulp.src(appDir + 'resources/bower/datetimepicker/*.css')
        .pipe(gulp.dest(destDir + '/datetimepicker'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + '/datetimepicker'))

    // autocomplete
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

    // chosen
    gulp.src(appDir + 'resources/bower/chosen/*.js')
        .pipe(gulp.dest(destDir + '/chosen'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/chosen'))

    gulp.src(appDir + 'resources/bower/chosen/*.css')
        .pipe(gulp.dest(destDir + '/chosen'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + '/chosen'))

    //custom component
    gulp.src(appDir + 'resources/bower/AUI/js/*')
        .pipe(gulp.dest(appDir + 'resources/assets/src/component/AUI'));
}

module.exports = task;