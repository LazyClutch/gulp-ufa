/**
 * Created by root on 16-3-18.
 */
var gulp = require('gulp');

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + params.context.dir;
    return gulp.src(appDir + 'resources/assets/src/iconfont/**/*')
        .pipe(gulp.dest(destDir + '/iconfont'));
}

module.exports = task;