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
 *           // flag to sign wether packet has arrived ord not.
 *           "arrived": <boolean>,
 *
 *           // a string containing the current delivery state (delivery service dependent)
 *           "status": <string>,
 *
 *           // an array of objects explaining the progress in detail
 *           // there can be zero to Math.Infinity entries here.
 *           "steps": [
 *                {
 *                    "date":     <string> // Unix Timestamp
 *                    "location": <string> // location of the step
 *                    "status":   <string> // message
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

    if (!this.isAvailableService(packet.service)) {
        console.log("Delivery service " + packet.service + " is not available.");
        return false;
    }

    if (typeof callback != "function") {
        console.log("No callback function given.");
        return false;
    }

    var deliveryService = getDeliveryService(packet.service);

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

            deliveryService.normalize(track, function (error, model) {

                if (error !== null) {
                    callback({
                        "status": false,
                        "data": {
                            // no data sadly :(
                        },
                        "issues": [
                            "Could not normalize parsed data."
                        ]
                    });

                    return;
                }

                callback({
                    "status": true,
                    "data":   model,
                    "issues": [
                        // no issues \o/
                    ]
                });
            });
        });
    });

    return true;
};

/**
 * checks if service is available.
 *
 * @param string service name of service
 * @return boolean
 * @access public
 * @final
 */
this.isAvailableService = function isAvailableService (service) {

    if (typeof service == "undefined") {
        return false;
    }

    if (_.indexOf(availableServices, service) === -1) {
        return false;
    }

    return true;
}

/**
 * gives the delivery service
 *
 * @param string serviceName name of delivery service
 * @return controller|null іf serviceName could not map
 * @access private
 * @final
 */
function getDeliveryService (serviceName) {

    switch (serviceName) {
    case "dhl":
        return nolp;
    case "ups":
        return ups;
    }

    return null;
}
