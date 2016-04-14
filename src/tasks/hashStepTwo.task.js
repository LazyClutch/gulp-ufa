var gulp = require('gulp');
var hash = require('gulp-rev');
var del = require('del');
var merge = require('merge-stream');
var fixUrl = require('../plugins/fixurl.js');

function task(cb, params) {
    var appDir = './' + params.app + '/';
    var destDir = appDir + params.context.dir;
    var hashDir = appDir + params.context.hash;
    var tmpDir = params.context.tmp;

    var isProduction = (params.context.env === 'production');

    // copy all resources to a new cache folder(fix url in pipe)
    var manifest = hashDir + 'manifest.json';

    return gulp.src(destDir + '**/*')
                .pipe(fixUrl(manifest))
                .pipe(gulp.dest(tmpDir + '_cache/'));
}


task.dependences = ['hashStepOne'];

module.exports = task;