var gulp = require('gulp');
function task() {
    var notify = require('gulp-notify');
    return gulp.start('sass', 'rem2px', 'devmain', 'deploymain', 'devlibs', 'copylibs', 'scripts', 'styles', 'images', 'fonts');
}

module.exports = task;