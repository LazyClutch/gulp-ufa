var gulp = require('gulp');
var rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css');
var minifycssOptions = require('../options.config').minifyOptions;

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + 'resources/assets/src/lib';

    // jquery-ui
    gulp.src([appDir + 'resources/bower/jquery-ui/**/*.js', '!' + appDir + 'resources/bower/jquery-ui/**/*.min.js'])
        .pipe(gulp.dest(destDir + '/jquery-ui'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/jquery-ui'))
    gulp.src([appDir + 'resources/bower/jquery-ui/**/*.css', '!' + appDir + 'resources/bower/jquery-ui/**/*.min.css'])
        .pipe(gulp.dest(destDir + '/jquery-ui'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + '/jquery-ui'))

    // canvas-to-blob
    gulp.src([appDir + 'resources/bower/blueimp-canvas-to-blob/js/**/*.js', '!' + appDir + 'resources/bower/blueimp-canvas-to-blob/js/**/*.min.js'])
        .pipe(gulp.dest(destDir + '/canvas-to-blob/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/canvas-to-blob/js'))

    // blueimp-file-upload
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
    gulp.src(appDir + 'resources/assets/src/common/jquery-cmd.js')
        .pipe(rename('jquery.js'))
        .pipe(gulp.dest(destDir + '/jquery-file-upload/js'))
        .pipe(gulp.dest(destDir + '/jquery-file-upload/js/vendor'))

    // jquery-ui-widget
    gulp.src(appDir + 'resources/assets/src/lib/jquery-file-upload/js/vendor/jquery.ui.widget.js')
        .pipe(gulp.dest(destDir));

    // uploadify
    gulp.src(appDir + 'resources/bower/uploadify/*')
        .pipe(gulp.dest(destDir + '/uploadify'))
    gulp.src(appDir + 'resources/bower/uploadify/uploadify.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + '/uploadify'))

    // load-image
    gulp.src([appDir + 'resources/bower/blueimp-load-image/js/**/*.js', '!' + appDir + 'resources/bower/blueimp-load-image/js/**/*.min.js'])
        .pipe(gulp.dest(destDir + '/load-image/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/load-image/js'))

    // blueimp-tmpl
    gulp.src(appDir + 'resources/bower/blueimp-tmpl/js/**/*.js')
        .pipe(gulp.dest(destDir + '/tmpl/js'))

    // chosen

    // highcharts
    gulp.src(appDir + 'resources/bower/highcharts/*.js')
        .pipe(gulp.dest(destDir + '/highcharts/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/highcharts/js'))
    gulp.src(appDir + 'resources/bower/highcharts/adapters/*.js')
        .pipe(gulp.dest(destDir + '/highcharts/js/adapters'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/highcharts/js/adapters'))
    gulp.src(appDir + 'resources/bower/highcharts/modules/*.js')
        .pipe(gulp.dest(destDir + '/highcharts/js/modules'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/highcharts/js/modules'))
    gulp.src(appDir + 'resources/bower/highcharts/themes/*.js')
        .pipe(gulp.dest(destDir + '/highcharts/js/themes'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/highcharts/js/themes'))

    // emoji
    gulp.src([appDir + 'resources/bower/jQuery-Emoji/js/*.js', '!' + appDir + 'resources/bower/jQuery-Emoji/js/*.min.js'])
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/jQuery-Emoji/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/jQuery-Emoji/js'))
    gulp.src(appDir + 'resources/bower/jQuery-Emoji/images/**')
        .pipe(gulp.dest(destDir + '/jQuery-Emoji/images'))

    // jquery datetimepicker
    gulp.src(appDir + 'resources/bower/jQuery-Form-Datetimepicker/*.js')
        .pipe(gulp.dest(destDir + '/datetimepicker'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/datetimepicker'))

    // jquery-form-validator
    gulp.src(appDir + 'resources/bower/jQuery-Form-Validator/form-validator/*')
        .pipe(gulp.dest(destDir + '/jquery-form-validator'))

    // jcrop
    gulp.src([appDir + 'resources/bower/jQuery-img-Jcrop/js/*', '!' + appDir + 'resources/bower/jQuery-img-Jcrop/js/*.min.js'])
        .pipe(gulp.dest(destDir + '/jcrop/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/jcrop/js'))
    gulp.src(appDir + 'resources/bower/jQuery-img-Jcrop/css/*')
        .pipe(gulp.dest(destDir + '/jcrop/css'))

    // magicsuggest
    gulp.src(appDir + 'resources/bower/magicsuggest/*.js')
        .pipe(gulp.dest(destDir + '/magicsuggest'))
    gulp.src(appDir + 'resources/bower/magicsuggest/*.css')
        .pipe(gulp.dest(destDir + '/magicsuggest'))

    // multiselect
    gulp.src(appDir + 'resources/bower/multiselect/js/**/*.js')
        .pipe(gulp.dest(destDir + '/multiselect/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/multiselect/js'))
    gulp.src(appDir + 'resources/bower/blueimp-file-upload/css/*.css')
        .pipe(gulp.dest(destDir + '/multiselect/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + '/multiselect/css'))
    gulp.src(appDir + 'resources/bower/blueimp-file-upload/img/*')
        .pipe(gulp.dest(destDir + '/multiselect/img'))

    // tinymce
    gulp.src(appDir + 'resources/bower/tinymce/**')
        .pipe(gulp.dest(destDir + '/tinymce'))

    //autocomplete: process the origin lib/jquery-ui/ui/autocomplete plugin as it does not support CMD
    gulp.src([
        appDir + 'resources/bower/jquery-ui/ui/core.js',
        appDir + 'resources/bower/jquery-ui/ui/widget.js',
        appDir + 'resources/bower/jquery-ui/ui/position.js',
        appDir + 'resources/bower/jquery-ui/ui/menu.js',
        appDir + 'resources/bower/jquery-ui/ui/autocomplete.js'
    ]).pipe(concat('autocomplete_base.js'))
        .pipe(gulp.dest(destDir + '/jquery-ui'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/jquery-ui'));
}

module.exports = task;