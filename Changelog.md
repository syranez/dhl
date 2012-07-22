## 1.2.0 (aka the ups release)

* dhl can track ups packets now
* tests added

## 1.1.2-beat (aka ups feature)

* status of ups packet is retrieved now
* format change of data:

    {
        "arrived": <boolean>,
        "status":  <string>,
        "steps":   [
        ],
    }

    See lib/model.js

## 1.1.1-beta (aka ups feature)

* steps can now be parsed
* date property in step₋objects is now an unix timestamp

# 1.1.0-beta (aka ups feature)

Added code structure for ups status page parsing. Does not really do anything.

## 1.0.0 (released)

This is the first release. All it can do is parse a dhl status page.
