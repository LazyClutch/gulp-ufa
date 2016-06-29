function task(cb, params) {
    if (params.context.env != 'dev') {
        return false;
    }

    var gulp = require('gulp');

    var imagemin = require('gulp-imagemin');

    var appDir = params.app + '/';
    var destDir = appDir + 'resources/assets/src/image';

    return gulp.src(appDir + 'resources/assets/imagesource/**/*')
                       .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
                       .pipe(gulp.dest(destDir));
}

module.exports = task;