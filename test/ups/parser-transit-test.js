/**
 *
 * tests for the ups parser
 */

var buster = require("buster");
var fs     = require("fs");
var parser = require("../../lib/ups/parser.js");

/**
 * parse dataset 1
 *
 */
buster.testCase("parse_ups-transit", {

    /**
     * setUp
     *
     * @param function done
     * @function
     */
    "setUp": function setUp (done) {

        var file = "./data/dataset-transit-1.html";

        var test = this;

        fs.readFile(file, "utf-8", function (error, data) {

            if (error) {
                throw error;
            }

            test.page = data;
            done();
        });
    },

    /**
     * the parseContext contains the expectedSteps-data
     *
     * @object
     */
    "parseContext": {

        /**
         * setUp
         *
         * @function
         */
        "setUp": function setUp () {

            this.expectedSteps = [
                {
                    "date":     "07/16/2012",
                    "time":     "2:40 P.M.",
                    "location": "United States",
                    "status":   "Order Processed: Ready for UPS"
                }, {
                    "date":     "07/16/2012",
                    "time":     "9:02 P.M.",
                    "location": "",
                    "status":   "Origin Scan"
                }, {
                    "date":     "07/16/2012",
                    "time":     "10:05 P.M.",
                    "location": "Obetz, OH, United States",
                    "status":   "Departure Scan"
                }, {
                    "date":     "07/16/2012",
                    "time":     "10:06 P.M.",
                    "location": "",
                    "status":   "Arrival Scan"
                }, {
                    "date":     "07/16/2012",
                    "time":     "11:50 P.M.",
                    "location": "Columbus, OH, United States",
                    "status":   "Departure Scan"
                }, {
                    "date":     "07/17/2012",
                    "time":     "6:34 A.M.",
                    "location": "Koeln, Germany",
                    "status":   "Package data processed by brokerage. Waiting for clearance."
                }, {
                    "date":     "07/17/2012",
                    "time":     "12:43 A.M.",
                    "location": "",
                    "status":   "Arrival Scan"
                }, {
                    "date":     "07/17/2012",
                    "time":     "1:48 A.M.",
                    "location": "Louisville, KY, United States",
                    "status":   "Export Scan"
                }, {
                    "date":     "07/17/2012",
                    "time":     "10:16 A.M.",
                    "location": "Koeln, Germany",
                    "status":   "Package data processed by brokerage. Waiting for clearance. / Released by Clearing Agency. Now in-transit for delivery."
                }, {
                    "date":     "07/17/2012",
                    "time":     "5:11 A.M.",
                    "location": "Louisville, KY, United States",
                    "status":   "Departure Scan"
                }, {
                    "date":     "07/17/2012",
                    "time":     "6:58 P.M.",
                    "location": "",
                    "status":   "Arrival Scan"
                }, {
                    "date":     "07/17/2012",
                    "time":     "11:30 P.M.",
                    "location": "Koeln, Germany",
                    "status":   "Import Scan"
                }
            ];
        },

        /**
         * parse the dataset
         *
         * @param function done
         * @function
         */
        "parse": function parse (done) {

            var test = this;

            parser.parse(this.page, function (error, data) {

                // There must not be an error
                assert.isNull(error, "Error on parsing occured.");

                // check status
                assert.same(data.status, "In Transit: On Time", "Status is wrong.");

                // check step count
                assert.same(data.steps.length, test.expectedSteps.length, "Numbers of step is wrong.");

                // check steps
                for (var i = 0, length = test.expectedSteps.length; i < length; i += 1) {
                    assert.same(data.steps[i].date,     test.expectedSteps[i].date,     "Date of step " + i + " is wrong.");
                    assert.same(data.steps[i].location, test.expectedSteps[i].location, "Location of step " + i + " is wrong.");
                    assert.same(data.steps[i].status,   test.expectedSteps[i].status,   "Status of step " + i + " is wrong.");
                }
                done();
            });
        }
    }
});

