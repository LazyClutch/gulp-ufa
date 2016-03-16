/**
 * Created by root on 16-3-16.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');

function task(cb, params) {
    var appDir = params.app + '/';

    var glupSass = require(appDir + 'resources/bower/ui/gulpfile'),
        args = process.argv.slice(2),
        themeIndex = args.indexOf('--theme'),
        theme;

    if (themeIndex > 0) {
        theme = args[++themeIndex]
    }

    glupSass.selectTheme(theme);

    gulp.src(appDir + 'resources/bower/ui/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest(appDir + 'resources/bower/ui/src/ui'));

    gulp.src(appDir + 'resources/bower/ui/src/**')
        .pipe(gulp.dest(appDir + 'resources/assets/ui'));
}

module.exports = task;
