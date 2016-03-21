/**
 * Created by root on 16-3-16.
 */
var gulp = require('gulp');
var gulpif = require('gulp-if');

var browserify = require('browserify');
var through = require('through2');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

var gulpBrowserify = function() {
    return through.obj(function (chunk, enc, callback) {
        var self = this;

        var b = browserify(chunk.path).bundle(function(err, buf) {
            if (err) {
                console.error('Error:', err.message);
                return;
            }
            chunk.contents = buf;
            self.push(chunk);
            callback();
        });
    });
};

function task(cb, params) {

    var appDir = params.app + '/';
    var destDir = appDir + params.context.dir;
    var isProduction = (params.context.env === 'production');

    return gulp.src(appDir + 'resources/assets/src/js/**/*.js')
        .pipe(gulpif(! isProduction, jshint(params.context.appDir + '.jshintrc')))
        .pipe(gulpif(! isProduction, jshint.reporter('default')))
        .pipe(gulpBrowserify())
        .pipe(gulp.dest(destDir + '/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/js'));
}

module.exports = task;