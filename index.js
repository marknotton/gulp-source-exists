'use strict'

// Dependencies
const through2 = require('through2'),
      fs       = require('fs'),
      path     = require('path'),
      log      = require('fancy-log'),
      chalk    = require('chalk');

module.exports = (files, callback = false) => {

  let filepaths = files.filter(file => !file.includes('*') && !file.includes('!'))
  let missing = filepaths.filter(file => fileExists(path.resolve(process.cwd(), file)) !== true);

  if (missing.length) {
    missing.forEach(file => {

			let message = `${chalk.red("Missing:")} ${chalk.red('Could not find '+file)}`;

      if (callback == true) {
        throw Error(message)
      } else if ( typeof callback == 'function') {
				callback(`[${(new Date()).toTimeString().substr(0,8)}] ${message}`);
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
