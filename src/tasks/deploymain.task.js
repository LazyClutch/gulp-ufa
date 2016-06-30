var gulp = require('gulp');

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + params.context.dir;

    var isProduction = (params.context.env === 'production');
    var sources = [];

    if (isProduction) {
        sources = [
            appDir + 'resources/assets/src/main.min.js',
            appDir + 'resources/assets/src/main.min.css',
            appDir + 'resources/assets/src/main-ie.min.js',
            appDir + 'resources/assets/src/main-ie.min.css'
        ];
    } else {
        sources = [
            appDir + 'resources/assets/src/main.js',
            appDir + 'resources/assets/src/main.css',
            appDir + 'resources/assets/src/main-ie.js',
            appDir + 'resources/assets/src/main-ie.css'
        ];
    }

    return gulp.src(sources)
                       .pipe(gulp.dest(destDir));
}

module.exports = task;