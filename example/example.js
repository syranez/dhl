var tracking = require('../index.js');
var _        = require('underscore');

/**
 * pls use your own packet id
 *
 * @var object
 */
var packet = {
    /**
     * service to query
     *
     * @var string
     */
    "service": "dhl",

    /**
     * packet id
     *
     * @var string
     */
    "id":      "345128097436"
};

var result = tracking.track(packet, function (tracking) {

    // check if tracking was not successful
    if (tracking.status === false) {

        // show the error messages
        _.each(tracking.issues, function (message) {
            console.log(message);
            return;
        });
    }

    // test whether packet already arrived (you should have got it then :)
    if (tracking.data.arrived === true) {
        console.log("arrived!");
    } else {
        console.log("not yet :(");
    }

    // show the tracking steps. there can be null to OVER900 steps.
    _.each(tracking.data.steps, function (s, index) {
        console.log("Step: " + index + " at " + s.date + " on " + s.location + " that: " + s.status);
    });
});

if (result === false) {
    console.log("Oops, wrong #track-Call. Fix it and try again.");
}
