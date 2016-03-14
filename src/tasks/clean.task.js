var del = require('del');
// TODO::Refine folders.
var folders = [
    'public/dist',
    'public/js',
    'public/css',
    'public/lib',
    'public/image',
    'public/font',
    'public/main-ie.*',
    'public/main.*',
];

function task(cb, params) {
    var appDir = params.app + '/';
    folders.forEach(function(folder, i){
        folders[i] = appDir + folder;
    });

    return del(folders);
}

module.exports = task;

