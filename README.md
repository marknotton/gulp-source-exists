# Source Exists

![Made For NPM](https://img.shields.io/badge/Made%20for-NPM-orange.svg)

Report files that don't exist from an array of relative paths.

## Installation
```
npm i @marknotton/source-exists --save-dev
```
```js
const sourceExists = require('@marknotton/source-exists')
```

## Usage

Simply pass in the same array of source files into the sourceExists function to check if the files exist.

Special cases where ignored files (!) or globs (*) are used will not be checked. Only full file paths relative to where the Gulp task file is located.  

```js
gulp.task('scripts', () => {

  let files = [
    "modules/scripts/file.js",
    "public/assets/js/galleryzzzz.js",
    "public/assets/js/inits.js",
    "public/assets/js/*/**.js"
  ]

  sourceExists(files)

  return gulp.src(files)
  .pipe(gulp.dest("combined.js"))
});
```
This will output something like this in your CLI:

`[12:32:01] Missing: public/assets/js/galleryzzzz.js Could not find this file`

You can pass in a second parameter too. A `true` boolean will cause your task to throw an error if a source file couldn't be found rather than outputting a CLI message.
Alternatively you can set your own callback function to do what you like. The callback function passes back an array of strings.  

```js
sourceExists(files, message => { console.log(message); })
```
