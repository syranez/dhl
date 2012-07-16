/**
 * Retrieves and parses the service of UPS.
 *
 */

var crawler = require('./crawler.js');
var parser  = require('./parser.js');

this.get   = crawler.get;
this.parse = parser.parse;
