var gulp = require('gulp');
var importcss = require('gulp-import-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var through = require('through2');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var minifycssOptions = require('../options.config').minifyOptions;

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

    gulp.src([
            appDir + 'resources/assets/src/common/main.js',
            appDir + 'resources/assets/src/navigation.js',
            appDir + 'resources/assets/src/common/track.js',
        ])
        .pipe(gulpBrowserify())
        .pipe(rename({suffix: '.dist'}))
        .pipe(gulp.dest(appDir + 'resources/assets/src/common'));

    /* Main Javascript file. */
    gulp.src([
            appDir + 'resources/bower/jquery/dist/jquery.min.js',
            appDir + 'resources/assets/src/common/main.dist.js',
            appDir + 'resources/assets/src/common/namespace.js',
            appDir + 'resources/assets/src/common/common.js',
            appDir + 'resources/assets/src/common/track.dist.js',
            appDir + 'resources/assets/src/common/ajax.js',
            appDir + 'resources/assets/src/common/navigation.dist.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));

    // IE
    gulp.src([
            appDir + 'resources/bower/jquery/dist/jquery.min.js',
            appDir + 'resources/assets/src/common/main.dist.js',
            appDir + 'resources/assets/src/common/namespace.js',
            appDir + 'resources/assets/src/common/common.js',
            appDir + 'resources/assets/src/common/track.dist.js',
            appDir + 'resources/assets/src/common/ajax.js',
            appDir + 'resources/assets/src/common/navigation.dist.js'
        ])
        .pipe(concat('main-ie.js'))
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));

    /* Main css file. */
    gulp.src([
            appDir + 'resources/assets/src/common/navigation.css',
            appDir + 'resources/assets/src/common/footer.css',
            appDir + 'resources/assets/src/common/app.css',
            appDir + 'resources/assets/src/common/iconfont.css',
            appDir + 'resources/assets/src/common/main.css'
        ])
       // .pipe(sass({ style: 'expanded' }))
        .pipe(concat('main.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir));

    return gulp.src([
            appDir + 'resources/assets/src/common/navigation.css',
            appDir + 'resources/assets/src/common/footer.css',
            appDir + 'resources/assets/src/common/app-ie.css',
            appDir + 'resources/assets/src/common/iconfont.css',
            appDir + 'resources/assets/src/common/main.css'
        ])
       // .pipe(sass({ style: 'expanded' }))
        .pipe(concat('main-ie.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest(destDir));
}

module.exports = task;