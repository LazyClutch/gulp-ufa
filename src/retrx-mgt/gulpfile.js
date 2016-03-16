var gulp = require('gulp');
var browserify = require('browserify');
var through = require('through2');
var importcss = require('gulp-import-css');
var minifycssOptions = {compatibility: 'ie7,ie8,+properties.iePrefixHack,+properties.ieSuffixHack,+colors.opacity'};
var concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    del = require('del');

var libraryPath = './vendor/angejia/library/src/';

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

gulp.task('notify', function() {
    var notify = require('gulp-notify');
    gulp.src('./resources/assets/src/main.js')
        .pipe(notify({message: 'Update Completed'}))
});

gulp.task('sass', function () {
    gulp.src('./resources/assets/sass/**/*.scss')
        .pipe(sass({
            includePaths: [libraryPath + 'foundation/scss'],
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./resources/assets/src/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./resources/assets/scss/**/*.scss', ['sass', 'rem2px', 'deploymain']);
});

gulp.task('rem2px', function () {
    var remToPx = require('gulp-rem-to-px');
    gulp.src('./resources/assets/src/main.css')
        .pipe(remToPx({
            fontSize: 16
        }))
        .pipe(rename({suffix: '-ie'}))
        .pipe(gulp.dest('./resources/assets/src'));
});

gulp.task('devmain', function() {
    var notify = require('gulp-notify');
    gulp.src([
            libraryPath + 'jquery/jquery.min.js',
            './resources/assets/src/common/common.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main Scripts (not IE) concat task complete'}));
    // IE
    gulp.src([
            libraryPath + 'html5shiv/html5shiv.min.js',
            libraryPath + 'respond/respond.min.js',
            libraryPath + 'jquery-legacy/jquery.min.js',
            './resources/assets/src/common/common.js'
        ])
        .pipe(concat('main-ie.js'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main Scripts (IE) concat task complete'}));
    /* Main css file. */
    gulp.src([
            './resources/assets/src/main.css'
        ])
        // .pipe(sass({ style: 'expanded' }))
        .pipe(concat('main.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main Styles concat task complete'}));

    return gulp.src([
            './resources/assets/src/main-ie.css'
        ])
        .pipe(concat('main-ie.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main IIE Styles concat task complete'}));
});

// deploy
gulp.task('deploymain', function() {
    gulp.src([
            './resources/assets/src/main.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest('./public/www'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'));
    gulp.src([
            './resources/assets/src/main-ie.js'
        ])
        .pipe(gulp.dest('./public/www'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'));
    gulp.src([
            './resources/assets/src/main-ie.css'
        ])
        // .pipe(sass({ style: 'expanded' }))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./public/www'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest('./public/dist'));
    return gulp.src([
            './resources/assets/src/main.css'
        ])
        // .pipe(sass({ style: 'expanded' }))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./public/www'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('styles', function() {
    return gulp.src('./resources/assets/src/css/**/*.css')
        // .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(importcss())
        .pipe(gulp.dest('./public/www/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src('./resources/assets/src/js/**/*.js')
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(gulpBrowserify())
        .pipe(gulp.dest('./public/www/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist/js'));
});

gulp.task('images', function() {
    return gulp.src('./resources/assets/src/image/**/*')
        // .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('./public/www/image'))
        .pipe(gulp.dest('./public/dist/image'));
});

gulp.task('iconfont', function() {
    return gulp.src('./resources/assets/src/iconfont/**/*')
        .pipe(gulp.dest('./public/www/iconfont'))
        .pipe(gulp.dest('./public/dist/iconfont'));
});

// clean
gulp.task('clean', function(cb) {
    return del(['./public/dist', './public/www'], cb);
});

gulp.task('default', ['clean'], function() {
    return gulp.start('deploymain', 'deploybase', 'copyvendorlibs', 'scripts', 'styles', 'images', 'iconfont');
});

gulp.task('all', ['clean'], function() {
    var notify = require('gulp-notify');
    return gulp.start('devmain', 'deploymain', 'devbase', 'deploybase', 'copyvendorlibs', 'scripts', 'styles', 'images', 'iconfont');
});

// Watch
gulp.task('watch', function() {
    // Watch main.js files
    gulp.watch(['./resources/assets/src/main.js', './resources/assets/src/main.css'], ['devmain', 'deploymain', 'notify']);
    
    // Watch lib files
    gulp.watch('./resources/assets/src/lib/**/*', ['copylibs', 'notify']);
    
    // Watch .scss files
    // gulp.watch('./resources/assets/src/styles/**/*.scss', ['styles']);

    // Watch .css files
    gulp.watch('./resources/assets/src/css/**/*.css', ['styles', 'notify']);

    // Watch .js files
    gulp.watch('./resources/assets/src/js/**/*.js', ['scripts', 'notify']);

    // Watch image files
    gulp.watch('./resources/assets/src/image/**/*', ['images', 'notify']);
});

// Task: copy vendor libs
gulp.task('copyvendorlibs', function() {
    gulp.src(libraryPath + 'jquery-form-validator/**')
        .pipe(gulp.dest('./public/www/lib/jquery-form-validator'))
        .pipe(gulp.dest('./public/dist/lib/jquery-form-validator'));

    gulp.src(libraryPath + 'autocomplete/**')
        .pipe(gulp.dest('./public/www/lib/autocomplete'))
        .pipe(gulp.dest('./public/dist/lib/autocomplete'));

    gulp.src(libraryPath + 'jquery-file-upload/**')
        .pipe(gulp.dest('./public/www/lib/jquery-file-upload'))
        .pipe(gulp.dest('./public/dist/lib/jquery-file-upload'));

    gulp.src(libraryPath + 'uploadify/**')
        .pipe(gulp.dest('./public/www/lib/uploadify'))
        .pipe(gulp.dest('./public/dist/lib/uploadify'));
    
    // datetimepicker
    return gulp.src(libraryPath + 'datetimepicker/**')
        .pipe(gulp.dest('./public/www/lib/datetimepicker'))
        .pipe(gulp.dest('./public/dist/lib/datetimepicker'));
});

//---------------------------------------------------------------
// gulp devui --theme retrx-mgt
gulp.task('devui', function() {
    var glupSass = require('./resources/bower/ui/gulpfile'),
        args = process.argv.slice(2),
        themeIndex = args.indexOf('--theme'),
        theme;

    if (themeIndex > 0) {
        theme = args[++themeIndex]
    }

    glupSass.selectTheme(theme);

    gulp.src('./resources/bower/ui/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest('./resources/bower/ui/src/ui'));

    gulp.src('./resources/bower/ui/src/**')
        .pipe(gulp.dest('./resources/assets/ui'));

});

gulp.task('devbase', function() {
    var notify = require('gulp-notify');
    gulp.src([
            libraryPath + 'jquery/jquery.min.js',
            './resources/assets/ui/common/common.js',
            './resources/assets/src/common/base.js'
        ])
        .pipe(concat('base.js'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main Scripts (not IE) concat task complete'}));
    // IE
    gulp.src([
            libraryPath + 'html5shiv/html5shiv.min.js',
            libraryPath + 'respond/respond.min.js',
            libraryPath + 'jquery-legacy/jquery.min.js',
            './resources/assets/ui/common/common.js',
            './resources/assets/src/common/base.js'
        ])
        .pipe(concat('base-ie.js'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main Scripts (IE) concat task complete'}));
    /* Main css file. */
    gulp.src([
            './resources/assets/ui/common/common.css',
            './resources/assets/src/common/base.css'
        ])
        // .pipe(sass({ style: 'expanded' }))
        .pipe(concat('base.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main Styles concat task complete'}));

    return gulp.src([
            './resources/assets/ui/common/common.css',
            './resources/assets/src/common/base.css'
        ])
        .pipe(concat('base-ie.css'))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./resources/assets/src'))
        .pipe(notify({message: 'Main IIE Styles concat task complete'}));
});

gulp.task('deploybase', function() {
    gulp.src([
            './resources/assets/src/base.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest('./public/www'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'));
    gulp.src([
            './resources/assets/src/base-ie.js'
        ])
        .pipe(gulp.dest('./public/www'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'));
    gulp.src([
            './resources/assets/src/base-ie.css'
        ])
        // .pipe(sass({ style: 'expanded' }))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./public/www'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest('./public/dist'));
    return gulp.src([
            './resources/assets/src/base.css'
        ])
        // .pipe(sass({ style: 'expanded' }))
        .pipe(importcss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./public/www'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss(minifycssOptions))
        .pipe(gulp.dest('./public/dist'));
});