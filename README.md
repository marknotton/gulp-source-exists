# Gulp Source Exists

Report back if any files are not found in the src glob.

### Installation
```
npm i gulp-source-exists --save-dev
```
### Setup
```
const sourceExists = require('gulp-source-exists')
```
------

## Usage

Simply pass in the same array of source files into the sourceExists function to check if all the files exist.

Special cases where ignored files (!) or globs are used will not be checked. Only full file paths relative to where the gulpfile is located.  

The `sourceExists` function accepts a second boolean parameter. If set to true, an error will be thrown if a file doesn't exist. Causing the task to fail completely.

```js
gulp.task('scripts', () => {

  let files = [
    "modules/scripts/file.js",
    "public/assets/js/gallery.js",
    "public/assets/js/inits.js",
    "public/assets/js/*/**.js"
  ]

  return gulp.src(files)
  .pipe(sourceExists(files))
  .pipe(gulp.dest("combined.js"))
});
```
