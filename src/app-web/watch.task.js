function task() {
    gulp.watch(['./resources/assets/src/main.js', './resources/assets/src/main.css'], ['devmain', 'deploymain', 'notify']);

    // Watch lib files
    gulp.watch('./resources/assets/src/lib/**/*', ['copylibs', 'notify']);

    // Watch .scss files
    // gulp.watch('./resources/assets/src/styles/**/*.scss', ['styles']);
    gulp.watch('./resources/assets/src/css/**/*.css', ['styles']);

    // Watch .js files
    gulp.watch('./resources/assets/src/js/**/*.js', ['scripts', 'notify']);

    // Watch image files
    gulp.watch('./resources/assets/src/image/**/*', ['images', 'notify']);

    // Watch image files
    gulp.watch('./resources/assets/src/iconfont/**/*', ['fonts', 'notify']);

    gulp.watch('./resources/assets/src/common/**/*', ['devmain', 'deploymain']);
    // Create LiveReload server
    // livereload.listen();

    // Watch any files in dist/, reload on change
    // gulp.watch(['dist/**']).on('change', livereload.changed);
}

module.exports = task;