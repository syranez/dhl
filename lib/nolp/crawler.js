/**
 * retrieves the nolp status page of package delivery.
 *
 */

var request = require('request');

var protocol = "http";
var host     = "nolp.dhl.de";
var service  = "nextt-online-public/set_identcodes.do";
var availableParams = [
    "idc",
    "xml",
    "extendedSearch"
];

/**
 * gives the uri to the status page.
 *
 * @param number idc packet id
 * @return string
 * @access private
 * @final
 */
function getRequestUri (idc) {

    return (protocol +
            "://" +
            host +
            "/" +
            service +
            "?" +
            "idc=" + idc
    );
}

/**
 * gets the nolp tracking page
 *
 * @param string|number idc packet number
 * @param function callback function (error: null|<{"msg": <string>}>, page: <string>);
 * @final
 * @access public
 */
this.get = function get (idc, callback) {

    var requestUri = getRequestUri(idc);

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
