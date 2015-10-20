var gulp = require('gulp');

function task(cb, params) {
    var appDir = params.app + '/';
    var crmOptions = require('./config').crmOptions;
    var builtRootDir = crmOptions.builtRootDir;

    return gulp.src(appDir + 'resources/assets/src/lib/**')
        .pipe(gulp.dest(appDir + builtRootDir + 'lib'))
        .pipe(gulp.dest(appDir + builtRootDir + 'dist/lib'));
}

module.exports = task;