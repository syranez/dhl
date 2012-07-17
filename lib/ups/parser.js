/**
 * parses the packet status page.
 *
 */

var cheerio = require('cheerio');
var moment  = require('moment');

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
 * parses the delivery steps.
 *
 * @param cheerio jQuery jQuery-like cheerio instance
 * @access private
 * @final
 */
function parseSteps (jQuery) {

    /**
     * format of ups date in moment
     *
     * @var string
     */
    var dateFormat = "MM/DD/YYYY, h:m A";

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

        parsedData.time.replace(/A\.M\./, "AM");
        parsedData.time.replace(/P\.M\./, "PM");

        var gatheredData = {
            "location": parsedData.location,
            "date":     moment(parsedData.date + ", " + parsedData.time, dateFormat).valueOf(),
            "status":   parsedData.status
        };

        data.steps.push(gatheredData);
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
