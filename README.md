# Gulp UFA

Make a uniform usage of gulp for Uniform Frontend Architecture.

## Pain Points
 1. 每个项目下载慢。
 1.

## Install

npm install

## Usage

`gulp-ufa $app $task --$env`

```
gulp-ufa // run "default" task for all apps in dev
gulp-ufa app-site// run "default" task for app-site in dev
gulp-ufa app-web --production// run "default" task for app-web in production
gulp-ufa app-boss scripts --production run "scripts" task for app-boss in production
```