var gulp = require('gulp');
var gulpif = require('gulp-if');

function task(cb, params) {
    var appDir = params.app + '/';

    var destDir = appDir + params.context.dir + '/lib';

    var isProduction = (params.context.env === 'production');


    return gulp.src(appDir + 'resources/assets/src/lib/**')
        .pipe(gulpif(! isProduction, gulp.dest(destDir)))
}

module.exports = task;