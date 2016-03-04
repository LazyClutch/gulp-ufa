var del = require('del');
var folders = [
    'storage/assets'
];

function task(cb, params) {
    var appDir = params.app + '/';
    folders.forEach(function(folder, i){
        folders[i] = appDir + folder;
    });

    return del(folders, cb);
}

module.exports = task;

