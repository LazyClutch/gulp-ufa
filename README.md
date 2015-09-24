# Gulp UFA

Make a uniform usage of gulp for Uniform Frontend Architecture.

## Pain Points
 1. Different applications have different configurations.
 1. Each applications needs to deploy itself every time.

## Install

npm install

## Usage

Command format: `gulp-ufa $app $task --$env`

```
gulp-ufa // run "default" task for all apps in dev
gulp-ufa app-site// run "default" task for app-site in dev
gulp-ufa app-web --production// run "default" task for app-web in production
gulp-ufa app-boss scripts --production run "scripts" task for app-boss in production
```

## Create New Task

Create one new task file under `tasks/` folder, and content would look like as following:

```
function task(cb, params) {

}

module.exports = task;
```

The parameter `params` has three attributes as following:

 - `app` string.

 E.g.: app-site

 - `task` string.

 E.g.: scripts

 - `context` object.

 E.g.: {


 }