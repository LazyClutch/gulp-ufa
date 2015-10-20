var gulp = require('gulp');
var crmOptions = require('./config').crmOptions;

function task(cb, params) {
    var appDir = params.app + '/';
    var builtRootDir = crmOptions.builtRootDir;

    return gulp.src(appDir + 'resources/assets/src/font/**/*')
        .pipe(gulp.dest(appDir + builtRootDir + 'font/'))
        .pipe(gulp.dest(appDir + builtRootDir + 'dist/font/'));
}

module.exports = task;