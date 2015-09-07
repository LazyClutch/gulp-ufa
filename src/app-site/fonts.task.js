var gulp = require('gulp');

function task(cb, params) {
    var appDir = params.app + '/';
    return gulp.src(appDir + 'resources/assets/src/iconfont/**/*')
        .pipe(gulp.dest(appDir + 'public/iconfont/'))
        .pipe(gulp.dest(appDir + 'public/dist/iconfont/'));
}

module.exports = task;