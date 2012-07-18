/**
 * converts the parsed data to own tracking model.
 *
 */

var model  = require('../model.js');
var moment = require('moment');
var _      = require('underscore');

/**
 * converts the parsed data.
 *
 * @param object parsedData
 * @param function callback function (error: null|<{"msg": <string>}>, model: <model>);
 * @access private
 * @final
 */
this.normalize = function normalize (parsedData, callback) {

    if (parsedData.status.toLowerCase() === "100%".toLowerCase()) {
        model.delivered = true;
    }

    var cleanedSteps = [];

    _.each(parsedData.steps, function (s) {

        /**
         * format of nolp date.
         *
         * @var string
         */
        var dateFormat = "DD.MM.YY h:m";

        // just geth DD.MM.YY h:m
        s.date = s.date.substr(5, 14);

        var gatheredData = {
            "location": s.location,
            "date":     moment(s.date, dateFormat).valueOf(),
            "status":   s.status
        };

        cleanedSteps.push(gatheredData);
    });

    model.status = parsedData.status;
    model.steps  = cleanedSteps;

    callback(null, model);
};
