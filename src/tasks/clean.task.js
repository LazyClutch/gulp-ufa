var del = require('del');
var folders = [
    'public/dist',
    'public/js',
    'public/css',
    'public/lib',
    'public/image',
    'public/font'
];

function  task(cb, params) {
    var appDir = params.app + '/';
    folders.forEach(function(folder, i){
        folders[i] = appDir + folder;
    });

    return del(folders, cb);
}

module.exports = task;

