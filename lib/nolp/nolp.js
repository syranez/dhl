/**
 * Retrieves and parses the nolp-Service of DHL.
 *
 */

var crawler = require('./crawler.js');
var parser  = require('./parser.js');

this.get   = crawler.get;
this.parse = parser.parse;
