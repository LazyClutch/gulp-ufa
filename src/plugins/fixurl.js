var path = require('path');

var through = require('through2');
var hash = require('gulp-hash');

var manifestMapping = {};
var assetsDir = '';

var plugin = function(filepath) {
    
    manifestMapping = require(filepath) || {};
    assetsDir = path.dirname(filepath);

  return through.obj(transformFn);
};

/**
 * @param Buffer file 
 * JSON.stringify(file):
 * {
 *     "cwd":"/workspace/project/angejia/angejia",
 *     "base":"/var/project/angejia/app-site/storage/assets",
 *     "path":"/var/project/angejia/app-site/storage/assets/manifest.json",
 *     "stat":{
 *         "atime":null,
 *         "mtime":null,
 *         "ctime":null,
 *         "birthtime":null
 *     },
 *     "_contents":{
 *         "type":"Buffer",
 *         "data":[123,...,125]
 *     }
 * }
 * 
 * 处理css里面的url问题过程参数举例:
 *   file:        '/var/project/angejia/app-site/storage/assets/font/iconfont-a218059a.ttf'
 *   filepath:    'iconfont.eot?#iefix' or '../../image/home.png'
 *   urlParts:    ['iconfont.eot', '#iefix']
 *   sep:         '?'
 *   url:         'iconfont.eot'
 *   normal url:  '/var/project/angejia/app-site/storage/assets/font/iconfont.eot'
 *   manifest:    {'font/iconfont.eot': 'font/iconfont-sss.eot'}
 *   relativePath:'font/iconfont.eot'
 *   hashFile:    'font/iconfont-sss.eot'
 */
function transformFn(file, encoding, callback) {

    if (file.isNull()) {
        return callback(null, file);
    }

    if (file.isStream()) {
        console.error('Error:', PLUGIN_NAME + 'Streams are not supported!');
        return callback();
    }

    if (path.extname(file.path) != '.css') {
        this.push(file);
        return callback();
    }
    
    var newContent = file.contents.toString();

    // 处理css里面的url问题
    var contents = newContent.replace(/url\(['"]?([^:)'"]+)['"]?\)/gm, function(match, filepath) {

        var urlParts = [filepath];
        var sep;
        if (/\?\S*#/.test(filepath)) {
            // '? #'排序
            sep = '?';
            urlParts = filepath.split(sep);
        } else if (/#\S*\?/.test(filepath)) {
            // '# ?'排序
            sep = '#';
            urlParts = filepath.split(sep);
        } else {
            // # or ?
            sep = filepath.match(/[\?|#]/);
            urlParts = filepath.split(sep);
        }

        var url = urlParts[0];

        var fileDir = path.dirname(url);

        var normalUrl = path.normalize(path.dirname(file.path) + '/' + url);
        var relativePath = path.relative(assetsDir, normalUrl);//TODO::assetsDir -> file.base
        var hashFile = path.basename(manifestMapping[relativePath.replace(/\.\/|\.\.\//, '')]);

        var newPath = fileDir + '/' + hashFile + (sep || '') + (urlParts[1] || '');

        return 'url(' + newPath + ')';
    });

    file.contents = new Buffer(contents);    

    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    callback();

}

module.exports = plugin;