/**
 * Created by root on 16-3-16.
 */
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

function task(cb, params) {
    var appDir = params.app + '/';
    gulp.src(appDir +'resources/assets/sass/**/*.scss')
        .pipe(sass({
            includePaths: [appDir + 'resources/bower/foundation/scss'],
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./resources/assets/src/'));
}

module.exports = task;
