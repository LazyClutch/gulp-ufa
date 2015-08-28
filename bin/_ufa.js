console.log('ufa start ...');

var options = require('../config');
var Ufa = require('../ufa');// class Ufa
var ufa = new Ufa();

ufa.init(options);
console.log(options);