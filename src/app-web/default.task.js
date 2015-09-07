function task() {
    return gulp.start('deploymain', 'copylibs', 'scripts', 'styles', 'images', 'fonts');
}

module.exports = task;