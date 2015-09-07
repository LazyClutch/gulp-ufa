function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + 'resources/assets/src/lib';

    // uploadify
    gulp.src(appDir + 'resources/bower/uploadify/*')
        .pipe(gulp.dest(appDir + 'resources/assets/src/lib/uploadify'))
    gulp.src(appDir + 'resources/bower/uploadify/uploadify.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(appDir + 'resources/assets/src/lib/uploadify'))

    // jquery-form-validator
    gulp.src(appDir + 'resources/bower/jquery-form-validator/form-validator/*')
        .pipe(gulp.dest(appDir + 'resources/assets/src/lib/jquery-form-validator'))

    // jquery datetimepicker
    gulp.src(appDir + 'resources/bower/datetimepicker/*.js')
        .pipe(gulp.dest(appDir + 'resources/assets/src/lib/datetimepicker'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(appDir + 'resources/assets/src/lib/datetimepicker'))

    gulp.src(appDir + 'resources/bower/datetimepicker/*.css')
        .pipe(gulp.dest(appDir + 'resources/assets/src/lib/datetimepicker'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(appDir + 'resources/assets/src/lib/datetimepicker'))
    
}

module.exports = task;