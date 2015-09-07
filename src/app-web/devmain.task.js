function task() {

    var notify = require('gulp-notify');

    /* Main Javascript file. */
    gulp.src([
            './resources/bower/jquery/dist/jquery.min.js',
            './resources/assets/src/common/main.js',
            './resources/assets/src/common/namespace.js',
            './resources/assets/src/common/common.js',
            './resources/assets/src/common/track.js',
            './resources/assets/src/common/ajax.js',
            './resources/assets/src/common/navigation.js'
        ])
        .pipe(concat('main.dist.js'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main Scripts concat task complete'}));

    gulp.src([
        './resources/bower/pubsub/pubsub.min.js'
    ]).pipe(gulp.dest('./resources/assets/src/lib'));

    /* Main css file. */
    gulp.src([
            './resources/assets/src/common/navigation.css',
            './resources/assets/src/common/footer.css',
            './resources/assets/src/common/app.css',
            './resources/assets/src/common/iconfont.css',
            './resources/assets/src/common/main.css'
        ])
//        .pipe(sass({ style: 'expanded' }))
        .pipe(concat('main.dist.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main Styles concat task complete'}));

    return gulp.src([
            './resources/assets/src/common/navigation.css',
            './resources/assets/src/common/footer.css',
            './resources/assets/src/common/app-ie.css',
            './resources/assets/src/common/iconfont.css',
            './resources/assets/src/common/main.css'
        ])
//        .pipe(sass({ style: 'expanded' }))
        .pipe(concat('main-ie.dist.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main IE Styles concat task complete'}));
}

module.exports = task;

