var del = require('del');
var crmOptions = require('./config').crmOptions;
var builtRootDir = crmOptions.builtRootDir;

var folders = [
    builtRootDir + 'dist',
    builtRootDir + 'js',
    builtRootDir + 'css',
    builtRootDir + 'lib',
    builtRootDir + 'image',
    builtRootDir + 'font'
];

function task(cb, params) {
    var appDir = params.app + '/';


    folders.forEach(function(folder, i){
        folders[i] = appDir + folder;
    });

    return del(folders, cb);
}

module.exports = task;

