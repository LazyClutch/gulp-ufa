var gulp = require('gulp');
function task(cb, params) {
    var app = params.app;

    if (params.context.env === 'dev') {
        console.log('= [App]: ', app, ' =');
    }

    if (params.context.env === 'dev') {
        return gulp.start(
            app + ':' + 'deploymain',
            app + ':' + 'copylibs',
            app + ':' + 'scripts',
            app + ':' + 'styles',
            app + ':' + 'images',
            app + ':' + 'fonts'
        );
    } else if (params.context.env === 'production') {
        return gulp.start(
            app + ':' + 'deploymain',
            app + ':' + 'copylibs',
            app + ':' + 'scripts',
            app + ':' + 'styles',
            app + ':' + 'images',
            app + ':' + 'fonts',
            app + ':' + 'deploy4cdn'
        );    
    }    
}

module.exports = task;