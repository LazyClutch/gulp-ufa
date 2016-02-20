function task(cb, params) {
    if (params.context.env != 'dev') {
        return false;
    }

    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var rename = require('gulp-rename');

    var appDir = params.app + '/';

    gulp.src(appDir + 'resources/assets/scss/**/app.scss')
        .pipe(sass({
            includePaths: [appDir + 'resources/bower/foundation/scss'],
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(rename('main.css'))
        .pipe(gulp.dest(appDir + 'resources/assets/src/'));

    gulp.src(appDir + 'resources/assets/scss/*.scss')
        .pipe(sass({
            includePaths: [appDir + 'resources/bower/foundation/scss'],
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(gulp.dest(appDir + 'resources/assets/src/css/ui'));
}

module.exports = task;