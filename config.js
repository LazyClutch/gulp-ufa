var fs = require('fs');
exports.appDir = __dirname + '/';
exports.taskDir = this.appDir + 'src/tasks';
exports.app = '';
exports.env = 'production';
exports.task = 'default';
exports.taskfiles = fs.readdirSync(this.taskDir);
exports.bowerDir = 'bower';
exports.dir = 'public/dist/';
exports.hash = 'storage/assets/';
exports.tmp = '/tmp/hash/';
