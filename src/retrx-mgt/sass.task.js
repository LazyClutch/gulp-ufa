/**
 * Created by root on 16-3-16.
 */
var gulp = require('gulp');
var rename = require('gulp-rename');

function task(cb, params) {
    var appDir = params.app + '/';
    var isProduction = (params.context.env === 'production');

    if(!isProduction){
        var sass = require('gulp-sass');

        gulp.src(appDir +'resources/assets/sass/**/*.scss')
            .pipe(sass({
                includePaths: [appDir + 'resources/bower/foundation/scss'],
                outputStyle: 'expanded',
                errLogToConsole: true
            }).on('error', sass.logError))
            .pipe(rename('main.css'))
            .pipe(gulp.dest(appDir + 'resources/assets/src/'));

        gulp.watch(appDir + 'resources/assets/scss/**/*.scss', ['sass', 'rem2px', 'deploymain']);
    }
}

module.exports = task;
