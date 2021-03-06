var gulp = require('gulp');
var hash = require('gulp-rev');
var merge = require('merge-stream');

function task(cb, params) {
    var appDir = './' + params.app + '/';
    var destDir = appDir + params.context.dir;
    var hashDir = appDir + params.context.hash;
    var tmpDir = params.context.tmp;

    var isProduction = (params.context.env === 'production');

    // After StepOne and StepTwo
    // Just need to hash  files from `cache` and copy to `asset` folder.
    return gulp.src(tmpDir + '_cache/**/*')
            .pipe(hash())
            .pipe(gulp.dest(tmpDir + 'assets/'))
            .pipe(hash.manifest('manifest.json'))
            .pipe(gulp.dest(hashDir));
}

task.dependences = ['hashStepOne', 'hashStepTwo'];
module.exports = task;