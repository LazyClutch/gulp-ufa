function task(cb, params) {
    if (params.context.env != 'dev') {
        return false;
    }

    var gulp = require('gulp');
    var remToPx = require('gulp-rem-to-px');
    var rename = require('gulp-rename');

    var appDir = params.app + '/';

    gulp.src(appDir + 'resources/assets/src/main.css')
        .pipe(remToPx({
            fontSize: 16
        }))
        .pipe(rename({suffix: '-ie'}))
        .pipe(gulp.dest(appDir + 'resources/assets/src'));
}

module.exports = task;