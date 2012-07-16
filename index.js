var _    = require('underscore');
var nolp = require('./lib/nolp/nolp.js');
var ups  = require('./lib/ups/ups.js');

/**
 * available delivery services
 *
 * @var array of strings
 * @private
 */
var availableServices = [
    "dhl",
    "ups"
];

/**
 * retrieves the status of a package sent with packet delivery service.
 *
 * A callback will be called with an tracking object:
 *
 *   {
 *      // contains the status of the tracking request
 *      // is true on success, false otherwise
 *      // use the issues array for human-readable error messages on failure.
 *      "status": <boolean>
 *
 *      // contains tracking data to the packet
 *      "data": {
 *
 *           // a string containing the progress in percent (mostly "0%" to "100%")
 *           "status": <string>,
 *
 *           // an array of objects explaining the progress in detail
 *           // there can be zero to Math.Infinity entries here.
 *           "steps": [
 *                {
 *                    "date":     <string> // dhl-formated date as string
 *                    "location": <string> // location of the step
 *                    "status":   <string> // message (german)
 *                }
 *           ]
 *       },
 *
 *       // an array containing strings with problems and errors on failure.
 *       "issues": [
 *       ]
 *   }
 *
 * @param object packet {"service": <string>, "id": <string>}
 * @param function callback get called with a status object
 * @returns boolean true on succesful call, false otherwise
 * @access public
 * @final
 */
this.track = function track (packet, callback) {

    if (typeof packet == "undefined") {
        console.log("No packet definition given.");
        return false;
    }

    if (typeof packet.id == "undefined") {
        console.log("No packet id given.");
        return false;
    }

    if (typeof packet.service != "string") {
        console.log("No packet service given.");
        return false;
    }

    if (_.indexOf(availableServices, packet.service) === -1) {
        console.log("Delivery service " + packet.service + " is not available.");
        return false;
    }

    if (typeof callback != "function") {
        console.log("No callback function given.");
        return false;
    }

    var deliveryService = null;
    switch (packet.service) {
    case "dhl":
        deliveryService = nolp;
        break;
    case "ups":
        deliveryService = ups;
        break;
    }

    deliveryService.get(packet.id, function (error, page) {

        if (error !== null) {

            callback({
                "status": false,
                "data": {
                    // no data sadly :(
                },
                "issues": [
                    "Could not retrieve status page."
                ]
            });

            return;
        }

        deliveryService.parse(page, function (error, track) {

            if (error !== null) {
                callback({
                    "status": false,
                    "data": {
                        // no data sadly :(
                    },
                    "issues": [
                        "Could not parse status page."
                    ]
                });

                return;
            }

            callback({
                "status": true,
                "data": {
                    "status": track.status,
                    "steps":  track.steps
                },
                "issues": [
                    // no issues \o/
                ]
            });
        });
    });

    return true;
};
