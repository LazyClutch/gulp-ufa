var gulp = require('gulp');
var hash = require('gulp-hash');

function task(cb, params) {
    var appDir = './' + params.app + '/';
    var hashDir = appDir + 'storage/assets/'

    return gulp.src(appDir + 'public/dist/**/*')
        .pipe(hash())
        .pipe(gulp.dest(hashDir))
        .pipe(hash.manifest('manifest.json'))
        .pipe(gulp.dest(hashDir))
}

// task.dependences = ['cleanhash'];
task.dependences = ['cleanhash', 'deploymain', 'copylibs', 'scripts', 'styles', 'images', 'fonts']

module.exports = task;