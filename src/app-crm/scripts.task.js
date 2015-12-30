var gulp = require('gulp');

var browserify = require('browserify');
var through = require('through2');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var crmOptions = require('./config').crmOptions;

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
    var builtRootDir = crmOptions.builtRootDir;

    return gulp.src(appDir + 'resources/assets/src/js/**/*.js')
        .pipe(jshint(params.context.appDir + '.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(gulpBrowserify())
        .pipe(gulp.dest(appDir + builtRootDir + 'js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(appDir + builtRootDir + 'dist/js'));
}

module.exports = task;