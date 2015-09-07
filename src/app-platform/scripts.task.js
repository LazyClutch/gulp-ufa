var gulp = require('gulp');
var browserify = require('gulp-browserify');

var rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');

function task(cb, params) {
    var appDir = params.app + '/';

    return gulp.src(appDir + 'resources/assets/src/js/**/*.js')
        .pipe(jshint(params.context.appDir + '.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(browserify())
        .pipe(gulp.dest(appDir + 'public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(appDir + 'public/dist/js'));
}


module.exports = task;