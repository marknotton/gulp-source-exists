'use strict'

// Dependencies
const through2 = require('through2'),
      fs       = require('fs'),
      path     = require('path'),
      log      = require('loggerer'),
      chalk    = require('chalk');

module.exports = (files, callback = false) => {

  let filepaths = files.filter(file => !file.includes('*') && !file.includes('!'))
  let missing = filepaths.filter(file => fileExists(path.resolve(process.cwd(), file)) !== true);

  if (missing.length) {
    missing.forEach(file => {

      if (callback == true) {
        throw Error('Missing: Could not find ' + file)
      } else if ( typeof callback == 'function') {
				callback(['Missing:', file, 'Could not find this file', ['red', 'red', 'red']]);
			} else {
      	log('Missing:', file, 'Could not find this file', ['red', 'red', 'red']);
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
