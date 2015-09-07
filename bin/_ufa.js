var args = process.argv;

// load configuration
var options = require('../config');

var len = args.length;

if (args[2]) {
    options.app = args[2];//e.g.: app-site
}
if (args[3]) {
    if (/^--/.test(args[3])) {
        options.env = args[3].replace(/^--/, '');//e.g.: production dev
    } else {
        options.task = args[3];//e.g.: scripts
    }
}
if (args[4]) {
    options.env = args[4].replace(/^--/, '');//e.g.: production dev
}

console.log('ufa start ...');

var Ufa = require('../ufa');// class Ufa
var ufa = new Ufa();

ufa.init(options);
ufa.run();