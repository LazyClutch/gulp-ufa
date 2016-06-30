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

    var notify = require('gulp-notify');

    /* Main Javascript file. */
    gulp.src([
            appDir + 'resources/assets/src/main/js/fastclick.js',
            appDir + 'resources/assets/src/main/js/zepto-custom.min.js',
            appDir + 'resources/assets/src/main/js/utils.js',
            appDir + 'resources/assets/src/main/js/zepto.temp.js',
            appDir + 'resources/assets/src/main/js/zepto.subscribepublish.js',
            appDir + 'resources/assets/src/main/js/ajax.js',
            appDir + 'resources/assets/src/main/js/detect.js',
            appDir + 'resources/assets/src/main/js/weixin.js',
            appDir + 'resources/assets/src/main.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir))
        .pipe(notify({message: 'Main Scripts (not IE) concat task complete'}));

    /* Main css file. */
    return gulp.src([
            appDir + 'resources/assets/src/main.css'
        ])
       // .pipe(sass({ style: 'expanded' }))
        .pipe(concat('main.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir))
        .pipe(notify({message: 'Main Styles concat task complete'}));

}

module.exports = task;