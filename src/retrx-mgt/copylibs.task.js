/**
 * Created by root on 16-3-16.
 */
var gulp = require('gulp');
var libraryPath = './vendor/angejia/library/src/';

function task(cb, params) {
    var appDir = params.app + '/';

    gulp.src(libraryPath + 'jquery-form-validator/**')
        .pipe(gulp.dest(appDir + 'public/www/lib/jquery-form-validator'))
        .pipe(gulp.dest(appDir + 'public/dist/lib/jquery-form-validator'));

    gulp.src(libraryPath + 'autocomplete/**')
        .pipe(gulp.dest(appDir + 'public/www/lib/autocomplete'))
        .pipe(gulp.dest(appDir + 'public/dist/lib/autocomplete'));

    gulp.src(libraryPath + 'jquery-file-upload/**')
        .pipe(gulp.dest(appDir + 'public/www/lib/jquery-file-upload'))
        .pipe(gulp.dest(appDir + 'public/dist/lib/jquery-file-upload'));

    gulp.src(libraryPath + 'uploadify/**')
        .pipe(gulp.dest(appDir + 'public/www/lib/uploadify'))
        .pipe(gulp.dest(appDir + 'public/dist/lib/uploadify'));

    // datetimepicker
    return gulp.src(libraryPath + 'datetimepicker/**')
        .pipe(gulp.dest(appDir + 'public/www/lib/datetimepicker'))
        .pipe(gulp.dest(appDir + 'public/dist/lib/datetimepicker'));
}

module.exports = task;
