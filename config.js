var fs = require('fs');
exports.appDir = __dirname + '/';
exports.taskDir = this.appDir + 'src/tasks';
exports.app = '';
exports.env = 'dev';
exports.task = 'default';
exports.taskfiles = fs.readdirSync(this.taskDir);


