/**
 * converts the parsed data to own tracking model.
 *
 */

var model  = require('../model.js');
var moment = require('moment');
var _      = require('underscore');

/**
 * progress of the delivery
 *
 * @var array of strings
 */
var progress = [
    "In Transit",
    "Delivered"
];

/**
 * converts the parsed data.
 *
 * @param object parsedData
 * @param function callback function (error: null|<{"msg": <string>}>, model: <model>);
 * @access private
 * @final
 */
this.normalize = function normalize (parsedData, callback) {

    if (parsedData.status.toLowerCase() === "Delivered".toLowerCase()) {
        model.delivered = true;
    }

    var cleanedSteps = [];

    _.each(parsedData.steps, function (s) {

        /**
         * format of ups date in moment
         *
         * @var string
         */
        var dateFormat = "MM/DD/YYYY, h:m A";

        s.time.replace(/A\.M\./, "AM");
        s.time.replace(/P\.M\./, "PM");

        var gatheredData = {
            "location": s.location.trim(),
            "date":     moment(s.date + ", " + s.time, dateFormat).valueOf(),
            "status":   s.status.trim()
        };

        cleanedSteps.push(gatheredData);
    });

    model.status = parsedData.status;
    model.steps  = cleanedSteps;

    callback(null, model);
};
