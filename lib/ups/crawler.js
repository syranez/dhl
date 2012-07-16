/**
 * retrieves the nolp status page of package delivery.
 *
 */

var request = require('request');

var protocol = "http";
var host     = "wwwapps.ups.com";
var service  = "etracking/tracking.cgi";
var availableParams = [
    "TypeOfInquiryNumber",
    "InquiryNumber1"
];

/**
 * gives the uri to the status page.
 *
 * @param string packetId packet id
 * @return string
 * @access private
 * @final
 */
function getRequestUri (packetId) {

    return (protocol +
            "://" +
            host +
            "/" +
            service +
            "?" +
            "TypeOfInquiryNumber=T" +
            "&" +
            "InquiryNumber1=" + packetId
    );
}

/**
 * gets the tracking page.
 *
 * @param string packetId packet id
 * @param function callback function (error: null|<{"msg": <string>}>, page: <string>);
 * @final
 * @access public
 */
this.get = function get (packetId, callback) {

    var requestUri = getRequestUri(packetId);

    request(requestUri, function (error, response, body) {

        if (   error
            || response.statusCode !== 200) {

            callback({
                "msg": "Could not retrieve status page."
            });
        } else {
            callback(null, body);
        }
    });
};
