/** 
* initialize addressbook data 
* Reads the addressbook file and import the data  
*
* @author Thomas Kurzok <t.kurzok@gmx.de>
*
* @requires fs
* @requires ../../settings.js
* @requires ../../addressbook.js
*/

var fs = require('fs'),
	settings = require('../../settings.js')
	addressbook = require('../../lib/addressbook.js');

module.exports = function(done) {
	fs.readFile(settings.filePath, 'utf8', function (err, data) {
		if (err) {
			throw err;
		}
		addressbook.setData(data);
		done();
	});
	
}
