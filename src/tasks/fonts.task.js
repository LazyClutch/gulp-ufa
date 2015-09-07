var gulp = require('gulp');

function task(cb, params) {
    var appDir = params.app + '/';
    return gulp.src(appDir + 'resources/assets/src/font/**/*')
        .pipe(gulp.dest(appDir + 'public/font/'))
        .pipe(gulp.dest(appDir + 'public/dist/font/'));
}

module.exports = task;