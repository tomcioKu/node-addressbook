/** 
* module to manage the addressbook (import data, find and sort contacts)
*
* @module addressbook
* @author Thomas Kurzok <t.kurzok@gmx..e>
*
* @requires underscore
* @requires ./app/models/contact.js
* @requires ./settings.js
*/

// import modules
var _u = require('underscore'),
	moment = require('moment'),
	contact = require('../app/models/contact.js'),
	settings = require('../settings.js');

/**
* @property {Array} addressBookData - Data storage
*/
var addressbook = {
	
	'addressBookData': [],

	/*
	* parses given addresses, creates the models and stores them in the data storage.
	*
	* @param {String} data 	- input (in plain text)
	*/
	'setData': function(data){
		var that = this;
		// loop through all entries 
		_u.each(data.split("\n"), function(el, i, list){
			if(el.length>0){
				// create Contact model and add it to the contact-list 
				var model = contact.create(el.split(', '));
				that.addressBookData.push(model);
			}
		});
		
	},

	/**
	* returns all contacts from addressbook
	*	
	* @returns {Array}
	*/
	'getData': function(){
		return this.addressBookData;
	},

	/*
	* find contacts from addressbook
	*
	* @param {String} field 		- where to search (name.gender.birthday)
	* @param {String|Integer} val 	- what to search 
	* @returns {Array}
	*/
	'find': function(field, val){
		
		var result = [];
		
		// check if any contacts exist, otherwise return an empty collection
		if(this.addressBookData.length<1){	
			return result; 
		}

		// create findBy object with required properties
		var findBy = new Object();
		Object.defineProperty(findBy, field, {value: val,writable : true,
                               enumerable : true,
                               configurable : true});

		// search in contactlist for given criteria
		result = _u.where(this.addressBookData, findBy);
 
		return result;
	},

	/*
	* find oldest contact from addressbook
	*
	* @returns {Object}			- Contact Object
	*/
	'findMaxAge': function(){
		var list = this.addressBookData; 
		if(list.length<1){
			return []; 
		}
		// the oldet person has the lowest tstamp
		return _u.min(list, function(it){ 
			return moment(it.birthday, 'DD/MM/YY').format('X');
		});
	}
};

module.exports = addressbook;