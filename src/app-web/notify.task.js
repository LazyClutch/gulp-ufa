function task() {
    var notify = require('gulp-notify');
    gulp.src('./resources/assets/src/main.js')
        .pipe(notify({message: 'Update Completed'}));
}

module.exports = task;