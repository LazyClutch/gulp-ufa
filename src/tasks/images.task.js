var gulp = require('gulp');
var gulpif = require('gulp-if');

//var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + params.context.dir + 'image';

    var isProduction = (params.context.env === 'production');

    return gulp.src(appDir + 'resources/assets/src/image/**/*')
        .pipe(gulpif(isProduction, imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest(destDir));
}

module.exports = task;