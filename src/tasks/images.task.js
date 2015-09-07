var gulp = require('gulp');
//var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

function task(cb, params) {
    var appDir = params.app + '/';

    return gulp.src(appDir + 'resources/assets/src/image/**/*')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest(appDir + 'public/image'))
        .pipe(gulp.dest(appDir + 'public/dist/image'));
}

module.exports = task;