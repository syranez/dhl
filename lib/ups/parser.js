/**
 * parses the packet status page.
 *
 */

var cheerio = require('cheerio');

/**
 * gathered data
 *
 * structure is as seen here.
 *
 * @var object
 * @private
 */
var data = {
    "status": "undefined",
    "steps": [
    ]
};

/**
 * starts the parse process.
 *
 * @param cheerio jQuery jQuery-like cheerio instance
 * @param function callback function (error: null|<{"msg": <string>}>, page: <string>);
 * @access private
 * @final
 */
function parse (jQuery, callback) {

    callback(null, data);
}

/**
 * parses the status page.
 *
 * @param cheerio jQuery jQuery-like cheerio instance
 * @param function callback function (error: null|<{"msg": <string>}>, page: <string>);
 * @access private
 * @final
 */
this.parse = function (page, callback) {

    var $ = cheerio.load(page);

    parse($, callback);
};
