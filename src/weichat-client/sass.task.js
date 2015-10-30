function task(cb, params) {


    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var importcss = require('gulp-import-css');
    var rename = require('gulp-rename');

    var appDir = './' + params.app + '/';

    return gulp.src(appDir + 'resources/assets/src/sass/**/*.scss')
        .pipe(sass({ style: 'expanded',
            errLogToConsole: true }).on('error', sass.logError))
        .pipe(importcss())
        .pipe(gulp.dest(appDir + 'resources/assets/src/css'))
}
module.exports = task;
