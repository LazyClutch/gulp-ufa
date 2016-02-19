var gulp = require('gulp');

function task(cb, params) {
    var app = params.app,
        appDir = app + '/';

    if(app === '.') {
        app = params.appSibling;
    }

    // tasks
    var devmain = app + ':devmain',
        deploymain = app + ':deploymain',
        notify = app + ':notify',
        copylibs = app + ':copylibs',
        styles = app + ':styles',
        scripts = app + ':scripts',
        fonts = app + ':fonts',
        images = app + ':images';
    
    gulp.watch([appDir + 'resources/assets/src/main.js', appDir + 'resources/assets/src/main.css'], [devmain, deploymain]);

    // Watch lib files
    gulp.watch(appDir + 'resources/assets/src/lib/**/*', [copylibs]);

    // Watch .scss files
    // gulp.watch(appDir + 'resources/assets/src/styles/**/*.scss', ['styles']);
    gulp.watch(appDir + 'resources/assets/src/css/**/*.css', [styles]);

    // Watch .js files
    gulp.watch(appDir + 'resources/assets/src/js/**/*.js', [scripts, notify]);

    // Watch image files
    gulp.watch(appDir + 'resources/assets/src/image/**/*', [images]);

    // Watch image files
    gulp.watch(appDir + 'resources/assets/src/iconfont/**/*', [fonts]);

    gulp.watch(appDir + 'resources/assets/src/common/**/*', [devmain, deploymain]);
}

module.exports = task;