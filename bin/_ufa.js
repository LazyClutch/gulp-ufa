// load configuration
var options = require('../config');

var program = require('commander');
program
  .version('1.2.0')
  .option('-p, --production', 'In production')
  .option('-P, --production', 'In production')
  .option('-d, --dev', 'In dev')
  .option('-r, --rule [rule]', 'Rule name')
  .option('-t, --tmp [tmp]', 'Set tmp dir', options.tmp)
  .option('--dir [dir]', 'Deploy to the dir', options.dir)
  .option('--hash [hash]', 'Set hash dir', options.hash)
  .parse(process.argv);

// after program defination.
var args = program.args;
var len = args.length;

if (program.production) {
    options.env = 'production';
}
if (program.dev) {
    options.env = 'dev';
}
if (program.rule) {
    options.rule = program.rule;
}
if (program.dir) {
    options.dir = (/\/$/.test(program.dir)) ? program.dir : program.dir + '/';
}
if (program.hash) {
    options.hash = (/\/$/.test(program.hash)) ? program.hash : program.hash + '/';
}
if (program.tmp) {
    options.tmp = (/\/$/.test(program.tmp)) ? program.tmp : program.tmp + '/';
}

if (args[0]) {
    options.app = args[0];//e.g.: app-site
}
if (args[1]) {
    options.task = args[1];//e.g.: scripts
}

// options.argv = program;

var Ufa = require('../ufa');// class Ufa
var ufa = new Ufa();

ufa.init(options);
ufa.run();