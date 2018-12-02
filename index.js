'use strict'

// Dependencies
const fs       = require('fs'),
      path     = require('path'),
      log      = require('@marknotton/lumberjack');

module.exports = (files, callback = false) => {

  let filepaths = files.filter(file => !file.includes('*') && !file.includes('!'))
  let missing = filepaths.filter(file => fileExists(path.resolve(process.cwd(), file)) !== true);

  if (missing.length) {
    missing.forEach(file => {

      if (callback == true) {
        throw Error('Missing: Could not find ' + file)
      } else if ( typeof callback == 'function') {
				callback(['Missing:', file, 'Could not find this file']);
			} else {
      	log('Missing:', file, 'Could not find this file', ['red', 'red', 'red']);
			}

    })
  }
};

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  }
  catch (err) {
    return filePath;
  }
}
