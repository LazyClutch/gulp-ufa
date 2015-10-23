var gulp = require('gulp');
var fs = require('fs');
function Ufa() {}

/**
 * init
 * @param opts
 *  app string
 *  task string
 *  env string
 *  taskfiles array ['clean.task.js', 'all.task.js', ... ]
 *
 *
 */
Ufa.prototype.init = function (opts) {
    if (opts.env === 'dev') {
        console.log("= DEBUG =\nInput Options: \n", opts);
    }

    this.app = opts.app || '';//all apps
    this.task = opts.task || 'default';
    this.env = opts.env || '';//production + dev
    this.appDir = opts.appDir;
    this.taskDir = opts.taskDir;
    this.bowerDir = opts.bowerDir || "bower_components";

    // init creating tasks.
    this.createTasks(opts.taskfiles);

};

// Create tasks according to task files under variable taskDir ('./src/tasks/')
Ufa.prototype.createTasks = function (files) {
    var self = this;
    var apps = this.getApps();

    apps.forEach(function(app){
        files.forEach(function(file) {
            var taskDefinition = self.taskDir + '/' + file;

            // override default task definition
            try{
                if (fs.readFileSync(self.appDir + 'src/' + app + '/' + file)) {
                    taskDefinition = self.appDir + 'src/' + app + '/' + file;
                }
            }catch(e) {
                // Do nothing.
            }

            var fn = require(taskDefinition);
            var name = file.replace(/.task.js$/, '');

            self.createTask(app, name, fn);
        });
    });

};

Ufa.prototype.createTask = function (app, taskname, callback) {
    // create single task
    var self = this;
    //TODO::clean
    var dependences = (['default', 'all'].indexOf(taskname) != -1 )? [app + ':clean'] : [];

    if (this.env === 'dev') {
        console.log('>> Create New Task: ' + app + ':' + taskname);
    }

    var params = {
        app: app,
        task: taskname,
        context: self
    };
    if(taskname === 'devmain' || taskname === 'devlibs') {
        params.bowerDir = this.bowerDir;
    }

    // rename task name
    gulp.task(app + ":" + taskname, dependences, function(cb) {return callback(cb, params);});
};

Ufa.prototype.getApps = function() {
    return this.app ? [this.app] : ['app-site'];
};

Ufa.prototype.formatTask = function(app, name) {
    return app + ":" + name;
};

Ufa.prototype.run = function() {

    var apps = this.getApps();
    var self = this;
    apps.forEach(function(app){
        gulp.start(app + ":" + self.task);
    });

};

module.exports = Ufa;