var gulp = require('gulp');
var rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css');
var minifycssOptions = require('../options.config').minifyOptions;

function task(cb, params) {
    var appDir = params.app + '/';
    var bowerDir = params.context.bowerDir + '/';
    var destDir = appDir + 'resources/assets/src/lib/';

    // jquery-ui
    gulp.src(bowerDir + 'jquery-ui/jquery-ui.js')
        .pipe(gulp.dest(destDir + 'jquery-ui'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'jquery-ui'))
    gulp.src(bowerDir + 'jquery-ui/themes/**')
        .pipe(gulp.dest(destDir + 'jquery-ui/themes'))
    gulp.src(bowerDir + 'jquery-ui/ui/**')
        .pipe(gulp.dest(destDir + 'jquery-ui/ui'))

    // canvas-to-blob
    gulp.src([bowerDir + 'blueimp-canvas-to-blob/js/**/*.js', '!' + bowerDir + 'blueimp-canvas-to-blob/js/**/*.min.js'])
        .pipe(gulp.dest(destDir + 'canvas-to-blob/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'canvas-to-blob/js'))

    // blueimp-file-upload
    gulp.src(bowerDir + 'blueimp-file-upload/js/**/*.js')
        .pipe(gulp.dest(destDir + 'jquery-file-upload/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'jquery-file-upload/js'))
    gulp.src(bowerDir + 'blueimp-file-upload/css/*.css')
        .pipe(gulp.dest(destDir + 'jquery-file-upload/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + 'jquery-file-upload/css'))
    gulp.src(bowerDir + 'blueimp-file-upload/img/*')
        .pipe(gulp.dest(destDir + 'jquery-file-upload/img'))
    gulp.src(appDir + 'resources/assets/src/common/jquery-cmd.js')
        .pipe(rename('jquery.js'))
        .pipe(gulp.dest(destDir + 'jquery-file-upload/js'))
        .pipe(gulp.dest(destDir + 'jquery-file-upload/js/vendor'))

    // jquery-ui-widget
    gulp.src(destDir + 'jquery-file-upload/js/vendor/jquery.ui.widget.js')
        .pipe(gulp.dest(destDir));

    // uploadify
    gulp.src(bowerDir + 'uploadify/*')
        .pipe(gulp.dest(destDir + 'uploadify'))
    gulp.src(bowerDir + 'uploadify/uploadify.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + 'uploadify'))

    // load-image
    gulp.src([bowerDir + 'blueimp-load-image/js/**/*.js', '!' + bowerDir + 'blueimp-load-image/js/**/*.min.js'])
        .pipe(gulp.dest(destDir + 'load-image/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'load-image/js'))

    // blueimp-tmpl
    gulp.src(bowerDir + 'blueimp-tmpl/js/**/*.js')
        .pipe(gulp.dest(destDir + 'tmpl/js'))

    // chosen

    // highcharts
    gulp.src(bowerDir + 'highcharts/*.js')
        .pipe(gulp.dest(destDir + 'highcharts/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'highcharts/js'))
    gulp.src(bowerDir + 'highcharts/adapters/*.js')
        .pipe(gulp.dest(destDir + 'highcharts/js/adapters'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'highcharts/js/adapters'))
    gulp.src(bowerDir + 'highcharts/modules/*.js')
        .pipe(gulp.dest(destDir + 'highcharts/js/modules'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'highcharts/js/modules'))
    gulp.src(bowerDir + 'highcharts/themes/*.js')
        .pipe(gulp.dest(destDir + 'highcharts/js/themes'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'highcharts/js/themes'))

    // emoji
    gulp.src([bowerDir + 'emoji/*.js'])
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'emoji'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'emoji'))
    gulp.src(bowerDir + 'emoji/images/**')
        .pipe(gulp.dest(destDir + 'emoji/images'))

    // jquery datetimepicker
    gulp.src(bowerDir + 'datetimepicker/*.js')
        .pipe(gulp.dest(destDir + 'datetimepicker'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'datetimepicker'))
    gulp.src(bowerDir + 'datetimepicker/*.css')
        .pipe(gulp.dest(destDir + 'datetimepicker'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + 'datetimepicker'))

    // jquery-form-validator
    gulp.src(bowerDir + 'jquery-form-validator/form-validator/*')
        .pipe(gulp.dest(destDir + 'jquery-form-validator/form-validator'))

    // jcrop
    gulp.src([bowerDir + 'jcrop/js/*', '!' + bowerDir + 'jcrop/js/*.min.js'])
        .pipe(gulp.dest(destDir + 'jcrop/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'jcrop/js'))
    gulp.src(bowerDir + 'jcrop/css/*')
        .pipe(gulp.dest(destDir + 'jcrop/css'))

    // magicsuggest
    gulp.src(bowerDir + 'magicsuggest/magicsuggest.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'magicsuggest'))
    gulp.src(bowerDir + 'magicsuggest/*.css')
        .pipe(gulp.dest(destDir + 'magicsuggest'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + 'magicsuggest'))

    // multiselect
    gulp.src(bowerDir + 'multiselect/js/*.js')
        .pipe(gulp.dest(destDir + 'multiselect/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'multiselect/js'))
    gulp.src(bowerDir + 'multiselect/css/*.css')
        .pipe(gulp.dest(destDir + 'multiselect/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir + 'multiselect/css'))
    gulp.src(bowerDir + 'multiselect/img/*')
        .pipe(gulp.dest(destDir + 'multiselect/img'))

    // tinymce
    gulp.src(bowerDir + 'tinymce/**')
        .pipe(gulp.dest(destDir + 'tinymce'))

    //autocomplete: process the origin lib/jquery-ui/ui/autocomplete plugin as it does not support CMD
    gulp.src([
        bowerDir + 'jquery-ui/ui/core.js',
        bowerDir + 'jquery-ui/ui/widget.js',
        bowerDir + 'jquery-ui/ui/position.js',
        bowerDir + 'jquery-ui/ui/menu.js',
        bowerDir + 'jquery-ui/ui/autocomplete.js'
    ]).pipe(concat('autocomplete_base.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + 'jquery-ui'));
}

module.exports = task;