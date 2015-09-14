var gulp = require('gulp');
var importcss = require('gulp-import-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + 'resources/assets/src';

    /* Main Javascript file. */
    gulp.src([
            appDir + 'resources/bower/jquery/dist/jquery.min.js',
            appDir + 'resources/assets/src/common/main.js',
            appDir + 'resources/assets/src/common/namespace.js',
            appDir + 'resources/assets/src/common/common.js',
            appDir + 'resources/assets/src/common/track.js',
            appDir + 'resources/assets/src/common/ajax.js',
            appDir + 'resources/assets/src/common/navigation.js'
        ])
        .pipe(concat('main.dist.js'))
        .pipe(gulp.dest(appDir + 'resources/assets/src'));

    /* Main css file. */
    gulp.src([
            appDir + 'resources/assets/src/common/navigation.css',
            appDir + 'resources/assets/src/common/footer.css',
            appDir + 'resources/assets/src/common/app.css',
            appDir + 'resources/assets/src/common/iconfont.css',
            appDir + 'resources/assets/src/common/main.css'
        ])
//        .pipe(sass({ style: 'expanded' }))
        .pipe(concat('main.dist.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(destDir));

    return gulp.src([
            appDir + 'resources/assets/src/common/navigation.css',
            appDir + 'resources/assets/src/common/footer.css',
            appDir + 'resources/assets/src/common/app-ie.css',
            appDir + 'resources/assets/src/common/iconfont.css',
            appDir + 'resources/assets/src/common/main.css'
        ])
//        .pipe(sass({ style: 'expanded' }))
        .pipe(concat('main-ie.dist.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(destDir));
}

module.exports = task;