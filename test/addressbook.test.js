var assert = require('node-assertthat'),
	_u = require('underscore'),
    moment = require('moment'),
    contact = require('../app/models/contact.js'),
    ab = require('../lib/addressbook.js');

suite('Addressbook', function () {
	var testdata = [];
	var splitChar = ", ";

	setup(function(){
		testdata.push('Bill McKnigt, Male, 16/03/77');
		testdata.push('Paul Robinson, Male, 15/01/85');
		testdata.push('Gemma Lane, Female, 20/11/91');
		testdata.push('Sarah Stone, Female, 20/09/80');
		testdata.push('Wes Jackson, Male, 14/08/74');

		ab.setData(testdata.join("\n"));
	});

	test('set/get data',function(){
		
		var actual = _u.map(ab.getData(),function(el){
			return el.toString();
		});	
		var expected = new Array();
		_u.each(testdata, function(el, i, list){
			expected.push(contact.create(el.split(splitChar)).toString());
		});

		assert.that(actual, is.equalTo(expected));
	});

	suite('find contacts',function(){
		
		test('by name',function(){
			var actual = _u.map(ab.find('name', 'Paul Robinson'),function(el){
				return el.toString();
			});
			var expected = [contact.create(testdata[1].split(splitChar)).toString()];

			assert.that(actual, is.equalTo(expected));
		});
		test('by gender',function(){
			var actual = _u.map(ab.find('gender', 'Female'),function(el){
				return el.toString();
			});
			var expected = new Array();
			expected[0] = contact.create(testdata[2].split(splitChar)).toString();
			expected[1] = contact.create(testdata[3].split(splitChar)).toString();

			assert.that(actual, is.equalTo(expected));
		});
		
		test('by birthday',function(){
			var actual = _u.map(ab.find('birthday', '16/03/77'), function(el){
				return el.toString();
			});
			var expected = [contact.create(testdata[0].split(splitChar)).toString()];
			assert.that(actual, is.equalTo(expected));
		});
		test('oldest person',function(){
			var actual = ab.findMaxAge().toString();
			var expected = contact.create(testdata[4].split(splitChar)).toString();
			assert.that(actual, is.equalTo(expected));
		});
	});
	teardown(function(){
		testdata = [];
		ab.addressBookData = [];
	});
});