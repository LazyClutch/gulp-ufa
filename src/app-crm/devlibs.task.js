var gulp = require('gulp');
var rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css');
var minifycssOptions = require('../options.config').minifyOptions;

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + 'resources/assets/src/lib';

    // uploadify
    gulp.src(appDir + 'resources/bower/uploadify/*')
        .pipe(gulp.dest(destDir + '/uploadify'))
    gulp.src(appDir + 'resources/bower/uploadify/uploadify.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + '/uploadify'))

    // jquery-file-upload
    gulp.src(appDir + 'resources/bower/blueimp-file-upload/js/**/*.js')
        .pipe(gulp.dest(destDir + '/jquery-file-upload/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/jquery-file-upload/js'))
    gulp.src(appDir + 'resources/bower/blueimp-file-upload/css/*.css')
        .pipe(gulp.dest(destDir + '/jquery-file-upload/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + '/jquery-file-upload/css'))
    gulp.src(appDir + 'resources/bower/blueimp-file-upload/img/*')
        .pipe(gulp.dest(destDir + '/jquery-file-upload/img'))

    // jquery-ui-widget
    gulp.src(appDir + 'resources/assets/src/lib/jquery-file-upload/js/vendor/*')
        .pipe(gulp.dest(destDir));

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

    // jquery fixedheadertable
    gulp.src(appDir + 'resources/bower/jquery.fixedheadertable/jquery.fixedheadertable.js')
        .pipe(gulp.dest(destDir + '/fixedheadertable'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/fixedheadertable'))

    gulp.src(appDir + 'resources/bower/jquery.fixedheadertable/css/*.css')
        .pipe(gulp.dest(destDir + '/fixedheadertable'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + '/fixedheadertable'))

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
}

module.exports = task;