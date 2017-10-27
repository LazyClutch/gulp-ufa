var gulp = require('gulp');
var importcss = require('gulp-import-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var minifycssOptions = require('../options.config').minifyOptions;

function task(cb, params) {
	var appDir = params.app + '/';
	var destDir = appDir + 'resources/assets/src';

	gulp.src([
		appDir + 'resources/assets/src/common/common.js',
		appDir + 'resources/assets/src/common/jQuery-ajaxTransport-XDomainRequest.js',
	])
		.pipe(concat('main.js'))
		.pipe(gulp.dest(destDir))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(destDir));

	/* Main css file. */
	return gulp.src([
		appDir + 'resources/assets/src/common/common.css'
	])
		.pipe(concat('main.css'))
		.pipe(importcss())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(destDir))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss(minifycssOptions))
		.pipe(gulp.dest(destDir));
}

module.exports = task;
