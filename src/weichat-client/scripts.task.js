var gulp = require('gulp');

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

    return gulp.src(appDir + 'resources/assets/src/js/core/Weichat.js')
        .pipe(jshint(params.context.appDir + '.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(gulpBrowserify())
        .pipe(gulp.dest(appDir + 'public/js'))
        .pipe(gulp.dest('../' + appDir + 'dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('../' + appDir + 'dist/js'));
}

module.exports = task;