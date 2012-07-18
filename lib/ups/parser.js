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
 * parses the overall delivery state.
 *
 * Normally that is a string of text.
 *
 * @param cheerio jQuery jQuery-like cheerio instance
 * @access private
 * @final
 */
function parseState (jQuery) {

    // Status der Sendung
    data.status = jQuery("#tt_spStatus").text();
}

/**
 * parses the delivery steps.
 *
 * @param cheerio jQuery jQuery-like cheerio instance
 * @access private
 * @final
 */
function parseSteps (jQuery) {

    // Skip first tr row cos it contains header.
    var skip = true;

    jQuery(".dataTable tr").each(function () {

        if (skip) {
            skip = false;
            return;
        }

        var step = jQuery(this);

        var parsedData = {
            "location": step.find("td:nth-child(1)").text().trim().replace(/\s+/gim, " "),
            "date":     step.find("td:nth-child(2)").text().trim().replace(/\s+/gim, " "),
            "time":     step.find("td:nth-child(3)").text().trim().replace(/\s+/gim, " "),
            "status":   step.find("td:nth-child(4)").text().trim().replace(/\s+/gim, " ")

        };

        data.steps.push(parsedData);
    });

    // UPS lists the steps from last step to first step down.
    data.steps.reverse();
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
