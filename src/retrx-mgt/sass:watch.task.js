/**
 * Created by root on 16-3-16.
 */
var gulp = require('gulp');

function task(cb, params) {
    var appDir = params.app + '/';

    gulp.watch(appDir + 'resources/assets/scss/**/*.scss', ['sass', 'rem2px', 'deploymain']);
}

module.exports = task;
