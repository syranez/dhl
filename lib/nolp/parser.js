/**
 * parses a nolp packet status page.
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
 * parses the overall delivery state.
 *
 * Normally that is a string of percent value between "0%" and "100%".
 *
 * @param cheerio jQuery jQuery-like cheerio instance
 * @access private
 * @final
 */
function parseState (jQuery) {

    // Status der Sendung
    data.status = jQuery("div.greenprogressbar span").text();
}

/**
 * parses the delivery steps.
 *
 * @param cheerio jQuery jQuery-like cheerio instance
 * @access private
 * @final
 */
function parseSteps (jQuery) {

    jQuery("table.full.eventList tbody tr").each(function () {

        var step = jQuery(this);

        var parsedData = {
            "date":     step.find("td.overflow").text().trim().replace(/\s+/gim, " "),
            "location": step.find("td.location div.overflow").text().trim().replace(/\s+/gim, " "),

            "status":   step.find("td.status div.overflow").text().trim().replace(/\s+/gim, " ")
        };

        data.steps.push(parsedData);
    });
}

/**
 * starts the parse process.
 *
 * @param cheerio jQuery jQuery-like cheerio instance
 * @param function callback function (error: null|<{"msg": <string>}>, page: <string>);
 * @access private
 * @final
 */
function parse (jQuery, callback) {

    parseState(jQuery);

    parseSteps(jQuery);

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
