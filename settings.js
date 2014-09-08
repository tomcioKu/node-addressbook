/** 
* settings module 
*
* @module settings
* @author Thomas Kurzok <t.kurzok@gmx.de>
*
* @property {String} filePath - filepath to addressbook file
* @property {Array} validQuestionIds - valid questions ids 
* @property {Object} fieldconf - field mapping {'modelProperty': dataColumn}
*/

var settings = {
	'filePath': __dirname + '/adressbook.txt',
	'validQuestionIds': [1,2,3],
	'fieldconf': {'name':0,'gender':1,'birthday':2}
};

module.exports = settings;
