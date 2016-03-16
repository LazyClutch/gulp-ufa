/**
 * Created by root on 16-3-16.
 */
var gulp = require('gulp');

function task(cb, params) {
    var appDir = params.app + '/';
    var notify = require('gulp-notify');
    gulp.src(appDir + 'resources/assets/src/main.js')
        .pipe(notify({message: 'Update Completed'}));

}

module.exports = task;