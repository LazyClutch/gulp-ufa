var gulp = require('gulp');

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + params.context.dir + 'image';

    return gulp.src(appDir + 'resources/assets/src/image/**/*')
                       .pipe(gulp.dest(destDir));
}

module.exports = task;