function task(cb, params) {
    gulp.src([
            './resources/assets/src/main.dist.js'
        ])
        .pipe(rename('main.js'))
        .pipe(gulp.dest('./public'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'));

    gulp.src([
            './resources/assets/src/main-ie.dist.js'
        ])
        .pipe(rename('main-ie.js'))
        .pipe(gulp.dest('./public'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'));

    return gulp.src([
            './resources/assets/src/main.dist.css'
        ])
//        .pipe(sass({ style: 'expanded' }))
        .pipe(rename('main-ie.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./public'))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./public'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest('./public/dist'))
        .pipe(rename('main-ie.min.css'))
        .pipe(gulp.dest('./public/dist'));
}

module.exports = task;