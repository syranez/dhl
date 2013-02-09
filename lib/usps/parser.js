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
    data.status = jQuery(".td-status").find('p').html();
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

    jQuery("#tc-hits tr").each(function () {

        if (skip) {
            skip = false;
            return;
        }

        var step = jQuery(this);
        
        var commaTwo = step.find("td:nth-child(5)").find('p').text().trim().lastIndexOf(",");
        var commaOne = step.find("td:nth-child(5)").find('p').text().trim().indexOf(",");
        
        var parsedData = {
            "status":   step.find("td:nth-child(4)").find('p').text().trim(),
            "location": step.find("td:nth-child(6)").find('p').text().trim(),
            "date":     commaOne == commaTwo ? step.find("td:nth-child(5)").find('p').text().trim() : step.find("td:nth-child(5)").find('p').text().trim().slice(0, commaTwo),
            "time":     commaOne == commaTwo ? "" : step.find("td:nth-child(5)").find('p').text().trim().slice(commaTwo + 2, step.find("td:nth-child(5)").find('p').text().trim().length)
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
