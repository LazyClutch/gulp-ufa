var gulp = require('gulp');
var fixUrl = require('../plugins/fixurl.js');


var del = require('del');

function task(cb, params) {
    var appDir = './' + params.app + '/';
    var hashDir = appDir + 'storage/assets/';
    var manifest = hashDir + 'manifest.json';

    return gulp.src(hashDir + '**/*')
                .pipe(fixUrl(manifest))
                .pipe(gulp.dest(hashDir))
                .pipe(gulp.dest(appDir + 'public/dist/'))
    
}

task.dependences = ['hash'];

module.exports = task;