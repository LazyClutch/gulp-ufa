var gulp = require('gulp');
var gulpif = require('gulp-if');

function task(cb, params) {
    var appDir = params.app + '/';

    var destDir = appDir + params.context.dir + 'lib';

    return gulp.src(appDir + 'resources/assets/src/lib/**')
        .pipe(gulpif(true, gulp.dest(destDir)))
}

module.exports = task;
