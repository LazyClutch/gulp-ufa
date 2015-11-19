var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

function task(cb, params) {
    var appDir = params.app + '/';
    var destDir = appDir + 'resources/assets/src/lib';


    //autocomplete
    gulp.src([
            appDir + 'resources/bower/jquery-ui/ui/core.js',
            appDir + 'resources/bower/jquery-ui/ui/widget.js',
            appDir + 'resources/bower/jquery-ui/ui/position.js',
            appDir + 'resources/bower/jquery-ui/ui/menu.js',
            appDir + 'resources/bower/jquery-ui/ui/autocomplete.js'
        ]).pipe(concat('search.box.js'))
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));

    gulp.src(appDir + './resources/bower/jquery.lazyload/jquery.lazyload.js')
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));

    gulp.src(appDir + './resources/bower/highcharts/src/highcharts.min.js')
        .pipe(gulp.dest(destDir))
        .pipe(rename('highcharts.js'))
        .pipe(gulp.dest(destDir));

    // weichat
    gulp.src(appDir + './resources/bower/weichat/dist/js/*')
        .pipe(gulp.dest(destDir));
    gulp.src(appDir + './resources/bower/weichat/dist/css/*')
        .pipe(gulp.dest(destDir));

    // angular
    gulp.src(appDir + './resources/bower/angular/angular.js')
        .pipe(gulp.dest(destDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));
}

module.exports = task;