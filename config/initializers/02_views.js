/** 
* initialize view 
* 
* @author Thomas Kurzok <t.kurzok@gmx.de>
*
*/

module.exports = function() {
  // Configure view-related settings. 
  this.set('views', __dirname + '/../../app/views');
  this.set('view engine', 'ejs');

  // Register EJS as a template engine.
  this.engine('ejs', require('ejs').__express); 
}
