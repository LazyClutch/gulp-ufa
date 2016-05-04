var del = require('del');
// TODO::Refine folders.
var folders = [
    'public/dist'
];

function task(cb, params) {
    var appDir = params.app + '/';
    folders.forEach(function(folder, i){
        folders[i] = appDir + folder;
    });

    return del(folders);
}

module.exports = task;

