/**
 *
 * tests for the ups parser
 */

var buster = require("buster");
var fs     = require("fs");
var parser = require("../../lib/ups/parser.js");

/**
 * parse dataset 2
 *
 */
buster.testCase("parse_ups-delivered", {

    /**
     * setUp
     *
     * @param function done
     * @function
     */
    "setUp": function setUp (done) {

        var file = "./data/dataset-delivered-1.html";

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
                    "date":     "07/18/2012",
                    "time":     "9:58 A.M.",
                    "location": "Koeln, Germany",
                    "status":   "Delivered"
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
                assert.same(data.status, "Delivered", "Status is wrong.");

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

