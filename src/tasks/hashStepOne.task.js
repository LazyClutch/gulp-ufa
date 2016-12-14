var gulp = require('gulp');
var hash = require('gulp-rev');
var del = require('del');

function task(cb, params) {
    var appDir = './' + params.app + '/';
    var destDir = appDir + params.context.dir;
    var hashDir = appDir + params.context.hash;

    var isProduction = (params.context.env === 'production');

    // delete temporary sync, e.g.: '/tmp/hash/'
    var tmpDir = params.context.tmp;
    del.sync([tmpDir, hashDir + 'manifest.json'], {force: true});


    // Step 1: hash image & font  and get manifest mapping

    // As the issue for module: gulp-rev, must code as following,
    // for more details, please refer to https://github.com/sindresorhus/gulp-rev/issues/123
    var manifestOptions = {path: hashDir + 'manifest.json', merge: true, base: hashDir};

    var hashSource = gulp.src([
                                        destDir + 'image/**',
                                        destDir + 'font/**',
                                        destDir + 'lib/**/*.PNG',
                                        destDir + 'lib/**/*.png',
                                        destDir + 'lib/**/*.jpg',
                                        destDir + 'lib/**/*.JPG',
                                        destDir + 'lib/**/*.gif',
                                        destDir + 'lib/**/*.GIF',
                                        destDir + 'lib/**/*.jpeg',
                                        destDir + 'lib/**/*.eot',
                                        destDir + 'lib/**/*.svg',
                                        destDir + 'lib/**/*.ttf',
                                        destDir + 'lib/**/*.woff',
                                        destDir + 'lib/**/*.swf'
                                    ], {base: destDir})
                                    .pipe(hash())
                                    .pipe(gulp.dest(tmpDir + '_step1/'))
                                    .pipe(hash.manifest(manifestOptions))
                                    .pipe(gulp.dest(hashDir));

    return hashSource;
}

task.dependences = ['deploymain', 'copylibs', 'scripts', 'styles', 'images', 'fonts'];

module.exports = task;