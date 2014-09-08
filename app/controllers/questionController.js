/** 
* Controller module 
*
* @module questionController
* @author Thomas Kurzok <t.kurzok@gmx.de>
*
* @requires locomotive
* @requires underscore
* @requires moment
* @requires ../../settings.js
* @requires ../../addressbook.js
*/

// import modules
var locomotive = require('locomotive'), 
	Controller = locomotive.Controller,
	_u = require('underscore'),
	moment = require('moment');

var settings = require('../../settings.js'),
	ab = require('../../lib/addressbook.js');
 
/**
* question controller.   
* @type {Object} 	- locomotive.Controller
*/
var questionController = new Controller();

/**
* predifinied question functions (action helper)   
* @type {Object} 	
*/
var questions = {

	// how many female addresses?
	'quest1': function(){
		// find female contacts and count the result (internally useing _where() )
		return ab.find('gender', 'Female').length;
	},
	
	// who is the oldest person?
	'quest2': function(){
		// use custom find function (internally useing _min() )
		return ab.findMaxAge();
	},

	// how many days is bill older then paul?
	'quest3': function(){
		// find both contacts
		var dif = 0;
		var c1 = ab.find('name', 'Bill McKnigt');
		var c2 = ab.find('name', 'Paul Robinson');
		if(c1.length>0 && c2.length > 0){
			var b1 = moment(c1[0].birthday, 'DD/MM/YY');
			var b2 = moment(c2[0].birthday, 'DD/MM/YY');

			// calculate the difference by duration() and asDays() 
			diff = moment.duration(b2.format('X')-b1.format('X')).asDays(); 
		} else {
			throw new Error('Contact Paul not found');
		}

		return diff;
	}
};

/**
* controller action (/questions/) 
* shows answers to all questions
*/
questionController.all = function() {
	
	// call action helper and assign the results to the view
	this.answer1 = questions.quest1();
	this.answer2 = questions.quest2();	
	this.answer3 = questions.quest3();

	// render view
	this.render();
};

/**
* controller action (/question/:id) 
* shows answer for a single questions
*
* @throws will throw an error when question is unknowm
*/
questionController.show = function() {
  	
  	// fetch the param from request
	var id = parseInt(this.param('id'));

	// validate given question id
	if(_u.contains(settings.validQuestionIds, id)){
		// call action helper and pass the result to the view
		this.answer = questions["quest"+id](); 
	}else{
		throw new Error('unknown question');
	}

	// assign vars to view and render
	this.questId = id; 
	this.render();
};


module.exports = questionController;

	