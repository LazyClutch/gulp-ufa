var gulp = require('gulp');
var fixUrl = require('../plugins/fixurl.js');

function task(cb, params) {
    var appDir = './' + params.app + '/';
    var tmpDir = params.context.tmp;
    var hashDir = appDir + params.context.hash;
    var manifest = hashDir + 'manifest.json';

    // e.g.: ./app-site/resources/assets/
    var hashDir = appDir + params.context.hash;

    return gulp.src(tmpDir + 'assets/**/*')
                .pipe(fixUrl(manifest))
                .pipe(gulp.dest(tmpDir + 'assets/'));
}

task.dependences = ['hash'];

module.exports = task;