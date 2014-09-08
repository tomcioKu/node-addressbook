// import modules
var assert = require('node-assertthat'),
    contact = require('../app/models/contact.js');

/**
* define testsuite Contact
*/
suite('Contact', function () {
	var actual;
	setup(function(){
		// create dummy contact
		actual = contact.create(['Bill McKnigt', 'Male', '16/03/77']);
	});
	test('create model', function(){
		assert.that(actual.name, is.equalTo('Bill McKnigt'));
		assert.that(actual.gender, is.equalTo('Male'));
		assert.that(actual.birthday, is.equalTo('16/03/77'));
	});

	test('toString', function(){
		assert.that(actual.toString(), is.equalTo("Bill McKnigt, Male, 16/03/77"));
	});
});