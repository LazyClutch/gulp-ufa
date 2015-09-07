var gulp = require('gulp');

function task(cb, params) {
    var appDir = params.app + '/';

    return gulp.src(appDir + 'resources/assets/src/lib/**')
        .pipe(gulp.dest(appDir + 'public/lib'))
        .pipe(gulp.dest(appDir + 'public/dist/lib'));
}

module.exports = task;