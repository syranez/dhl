var nolp = require('./lib/nolp/nolp.js');

/**
 * retrieves the status of a package sent with german DHL
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
 * @param number packet your packet id
 * @param function callback get called with a status object
 * @returns boolean true on succesful call, false otherwise
 * @access public
 * @final
 */
this.track = function track (packet, callback) {

    if (typeof packet != "number") {
        console.log("dhl-tracking@track: no packet id defined.");
        return false;
    }

    if (typeof callback != "function") {
        console.log("dhl-tracking@track: no callback function defined.");
        return false;
    }

    nolp.get(packet, function (error, page) {

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

        nolp.parse(page, function (error, track) {

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
