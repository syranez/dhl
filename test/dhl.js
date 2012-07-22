/**
 * quick test for humans to check if all is okay.
 *
 */

var tracking = require('../index.js');
var _        = require('underscore');
var moment   = require('moment');

var packet = {
    "service": "dhl",
    "id":      345128097436
};

tracking.track(packet, function (tracking) {

    if (tracking.status === false) {
        _.each(tracking.issues, function (message) {
            console.log(message);
            return;
        });
    }

    if (tracking.data.status === "100%") {
        console.log("arrived!");
    } else {
        console.log("not yet :(");
    }

    _.each(tracking.data.steps, function (s, index) {
        console.log("Step: " + index + " at " + moment(s.date).format("dddd, MMMM Do YYYY, hh:mm") + " on " + s.location + " that: " + s.status);
    });
});
