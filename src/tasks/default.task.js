var gulp = require('gulp');
function task(cb, params) {
    var app = params.app;

    if (params.context.env === 'dev') {
        console.log('= [App]: ', app, ' =');
    }

    return gulp.start(
        app + ':' + 'deploymain',
        app + ':' + 'copylibs',
        app + ':' + 'scripts',
        app + ':' + 'styles',
        app + ':' + 'images',
        app + ':' + 'fonts'
    );
}

module.exports = task;