'use strict'

// Dependencies
const through2 = require('through2'),
      fs       = require('fs'),
      path     = require('path'),
      log      = require('fancy-log'),
      chalk    = require('chalk');

module.exports = (files, fail = false, callback) => {

  let filepaths = files.filter(file => !file.includes('*') && !file.includes('!'))
  let missing = filepaths.filter(file => fileExists(path.resolve(process.cwd(), file)) !== true);

  if (missing.length) {
    missing.forEach(file => {
      if (fail) {
        throw Error("The following file from your src stream doesn't exist: " +  missing)
      }

			let message = `${chalk.red("Missing file:")} ${chalk.red('Could not find '+file)}`;

			if ( typeof callback !== 'undefined') {
				callback(message);
			} else {
      	log(message);
			}

    })
  }

  return through2.obj(function (chunk, enc, callback) {
    this.push(chunk)
    callback()
  })
};

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  }
  catch (err) {
    return filePath;
  }
}
