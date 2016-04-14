# Gulp UFA

Make a uniform usage of gulp for Uniform Frontend Architecture.

## Pain Points
 1. Different applications have different configurations.
 1. Each applications needs to deploy itself every time.

## Pre-Install

 1. Check your npm registry config. To view your config, please run command ```npm config list```. It will return:
    ```
    ; cli configs
    user-agent = "npm/2.14.4 node/v4.1.1 darwin x64"

    ; userconfig /Users/quentin/.npmrc
    registry = "http://registry.npm.taobao.org/"

    ; builtin config undefined
    prefix = "/usr/local"
    ```

 1. Suggestion: set npm config `registry` to `http://registry.npm.taobao.org/`.

    ```
    npm config set registry http://registry.npm.taobao.org/
    ```


## Install

`npm install`

## Usage

Command format: `gulp-ufa $app $task --$env --dir $dir`

```
gulp-ufa app-site// run "default" task for app-site in production and dir is 'public/dist/'
gulp-ufa app-web -p --dir public/dist // run "default" task for app-web in production and dir is 'public/dist/'
gulp-ufa app-boss scripts -p --dir public/dist // run "scripts" task for app-boss in production and dir is 'public/dist/'
```

## Create New Task

Create one new task file under `tasks/` folder, and content would look like as following:

```
function task(cb, params) {
    //TODO::task content
}
module.exports = task;
```

Attributes in `params` parameter:

 - `app` string.

 E.g.: app-site

 - `task` string.

 E.g.: scripts

 - `context` object.

 E.g.: {


 }