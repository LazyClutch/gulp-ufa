var gulp = require('gulp');
var hash = require('gulp-rev');
var del = require('del');

function task(cb, params) {
    var appDir = './' + params.app + '/';
    var destDir = appDir + params.context.dir;
    var hashDir = appDir + params.context.hash;

    var isProduction = (params.context.env === 'production');

    // delete temporary sync, e.g.: '/tmp/hash/'
    var tmpDir = params.context.tmp;
    del.sync([tmpDir, hashDir + 'manifest.json'], {force: true});

    // e.g.: 'app-site/public/dist/**/*'
    return gulp.src(destDir + '**/*')
        .pipe(hash())
        .pipe(gulp.dest(tmpDir + 'assets/'))
        .pipe(hash.manifest('manifest.json'))
        .pipe(gulp.dest(hashDir));

}

task.dependences = ['deploymain', 'copylibs', 'scripts', 'styles', 'images', 'fonts'];

module.exports = task;