/** 
* Contact Ḿodel 
*
* @module contact
* @author Thomas Kurzok <t.kurzok@gmx.de>
*
*/

/**
* @class Contact 
*
* @param  {String} name
* @param  {String} gender
* @param  {Date} birthday
*
*/
function Contact(name,gender,birthday){
	this.name=name;
	this.gender=gender;
	this.birthday=birthday;
}

/**
* prototypes toString Method
* @returns {String} <name>, <gender>, <birthday> 
*/
Contact.prototype.toString = function() {
	return this.name+", "+this.gender+", "+this.birthday;
};


// factory for creating contact objects
var contact = {
	'create': function(data){
		return new Contact(data[0], data[1], data[2]);
	}
}

module.exports = contact;