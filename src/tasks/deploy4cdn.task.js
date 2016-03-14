var gulp = require('gulp');
var del = require('del');

function task(cb, params) {
    var appDir = params.app + '/';
    var tmpDir = params.context.tmp;
    var destDir = appDir + params.context.dir;

    //TODO::'public/' folder in production.
    if (params.context.env === 'production') {
        del.sync([destDir], {force: true});
    }

    return gulp.src(tmpDir + 'assets/**/*')
               .pipe(gulp.dest(destDir));
}

task.dependences = ['prepare4cdn'];

module.exports = task;