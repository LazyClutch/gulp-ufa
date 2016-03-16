/**
 * Created by root on 16-3-16.
 */
var gulp = require('gulp');
var rename = require('gulp-rename');

function task(cb, params) {
    var appDir = params.app + '/';

    var remToPx = require('gulp-rem-to-px');
    gulp.src(appDir + 'resources/assets/src/main.css')
        .pipe(remToPx({
            fontSize: 16
        }))
        .pipe(rename({suffix: '-ie'}))
        .pipe(gulp.dest('./resources/assets/src'));
}

module.exports = task;
