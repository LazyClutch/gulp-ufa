var gulp = require('gulp');
//var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var crmOptions = require('./config').crmOptions;
var builtRootDir = crmOptions.builtRootDir;

function task(cb, params) {
    var appDir = params.app + '/';

    return gulp.src(appDir + 'resources/assets/src/image/**/*')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest(appDir + builtRootDir + 'image'))
        .pipe(gulp.dest(appDir + builtRootDir + 'dist/image'));
}

module.exports = task;