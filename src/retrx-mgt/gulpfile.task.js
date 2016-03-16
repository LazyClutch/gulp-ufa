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

gulp.task('sass:watch', function () {
    gulp.watch('./resources/assets/scss/**/*.scss', ['sass', 'rem2px', 'deploymain']);
});

