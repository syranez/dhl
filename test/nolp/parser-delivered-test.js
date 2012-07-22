/**
 *
 * tests for the nolp parser
 */

var buster = require("buster");
var fs     = require("fs");
var parser = require("../../lib/nolp/parser.js");

/**
 * parse dataset 1
 *
 */
buster.testCase("parse_nolp-delivered", {

    /**
     * setUp
     *
     * @param function done
     * @function
     */
    "setUp": function setUp (done) {

        var file = "./data/dataset-1.html";

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
                    "date":     "Sa, 07.07.12 21:54 Uhr",
                    "location": "--",
                    "status":   "Die Auftragsdaten zu dieser Sendung wurden vom Absender elektronisch an DHL übermittelt."
                }, {
                    "date":     "Mo, 09.07.12 11:24 Uhr",
                    "location": "Radefeld",
                    "status":   "Die Sendung wurde im Start-Paketzentrum bearbeitet."
                }, {
                    "date":     "Di, 10.07.12 04:10 Uhr",
                    "location": "Kitzingen",
                    "status":   "Die Sendung wurde im Ziel-Paketzentrum bearbeitet."
                }, {
                    "date":     "Di, 10.07.12 06:56 Uhr",
                    "location": "Kitzingen",
                    "status":   "Die Sendung wurde in das Zustellfahrzeug geladen."
                }, {
                    "date":     "Di, 10.07.12 09:38 Uhr",
                    "location": "--",
                    "status":   "Die Sendung wurde erfolgreich zugestellt."
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
                assert.same(data.status, "100%", "Status is wrong.");

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

