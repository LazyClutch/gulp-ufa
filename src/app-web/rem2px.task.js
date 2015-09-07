function task() {
    var remToPx = require('gulp-rem-to-px');
    gulp.src('./resources/assets/src/common/app.css')
        .pipe(remToPx({
            fontSize: 10
        }))
        .pipe(rename({suffix: '-ie'}))
        .pipe(gulp.dest('./resources/assets/src/common'));
}

module.exports = task;