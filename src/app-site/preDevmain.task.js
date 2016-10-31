var gulp = require('gulp');
var browserify = require('browserify');
var through = require('through2');
var rename = require('gulp-rename');

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
    var destDir = appDir + 'resources/assets/src';

    return gulp.src([
            appDir + 'resources/assets/src/common/main.js',
            appDir + 'resources/assets/src/navigation.js',
            appDir + 'resources/assets/src/common/track.js',
        ])
        .pipe(gulpBrowserify())
        .pipe(rename({suffix: '.dist'}))
        .pipe(gulp.dest(appDir + 'resources/assets/src/common'));
}

module.exports = task;