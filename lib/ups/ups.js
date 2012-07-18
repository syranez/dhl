/**
 * Retrieves and parses the service of UPS.
 *
 */

var crawler    = require('./crawler.js');
var normalizer = require('./normalizer.js');
var parser     = require('./parser.js');

this.get       = crawler.get;
this.normalize = normalizer.normalize;
this.parse     = parser.parse;
