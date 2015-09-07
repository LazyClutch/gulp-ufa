function task() {
    var sass = require('gulp-sass');
    gulp.src('./resources/assets/scss/**/*.scss')
        .pipe(sass({
            includePaths: ['./resources/scss'],
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(gulp.dest('./resources/assets/src/common'));
}

module.exports = task;