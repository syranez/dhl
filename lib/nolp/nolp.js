/**
 * Retrieves and parses the nolp-Service of DHL.
 *
 */

var crawler    = require('./crawler.js');
var normalizer = require('./normalizer.js');
var parser     = require('./parser.js');

this.get       = crawler.get;
this.normalize = normalizer.normalize;
this.parse     = parser.parse;
