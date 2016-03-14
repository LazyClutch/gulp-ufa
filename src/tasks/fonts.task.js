var gulp = require('gulp');
var gulpif = require('gulp-if');

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + params.context.dir + 'font';

    var isProduction = (params.context.env === 'production');
    return gulp.src(appDir + 'resources/assets/src/font/**/*')
        .pipe(gulp.dest(destDir));
}

module.exports = task;