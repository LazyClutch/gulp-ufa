var gulp = require('gulp');
var importcss = require('gulp-import-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

function task(cb, params) {
    var appDir = params.context.app + '/';
    var destDir = appDir + 'resources/assets/src/';
    var bowerDir = appDir + 'resources/' + params.context.bowerDir + '/';
    var notify = require('gulp-notify');

    /* Main Javascript file. */
    // not IE
    gulp.src([
            bowerDir + 'jquery/dist/jquery.min.js',
            bowerDir + 'ui/dist/js/common.js'
            // destDir + 'common/common.js'
        ])
        .pipe(concat('main.dist.js'))
        .pipe(gulp.dest(destDir));

    // IE
    gulp.src([
            bowerDir + 'html5shiv/dist/html5shiv.min.js',
            bowerDir + 'respond/dest/respond.min.js',
            bowerDir + 'jquery-legacy/dist/jquery.min.js',
            bowerDir + 'ui/dist/js/common.js'
            // destDir + 'common/common.js'
        ])
        .pipe(concat('main-ie.dist.js'))
        .pipe(gulp.dest(destDir));

    /* Main css file. */
    return gulp.src([
            bowerDir + 'ui/dist/css/app-crm/main.css',
            destDir + 'css/uicrm/custom.css',
            destDir + 'css/uicrm/bizbase.css',
            destDir + 'css/uicrm/navigation.css',
            destDir + 'css/uicrm/sidebar.css'
        ])
        .pipe(concat('main.dist.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(destDir))
        .pipe(rename('main-ie.dist.css'))
        .pipe(gulp.dest(destDir))
        .pipe(notify({message: 'Main Styles concat task complete'}));

}

module.exports = task;
