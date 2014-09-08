/** 
* initialize middleware 
* 
* @author Thomas Kurzok <t.kurzok@gmx.de>
* @requires express
*/

var express = require('express');

module.exports = function() {

  // this.use(poweredBy('Locomotive'));
  this.use(express.favicon());
  this.use(express.static(__dirname + '/../../public'));
  this.use(this.router);
  this.use(express.errorHandler());

}
