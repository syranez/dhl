[![build status](https://secure.travis-ci.org/syranez/dhl.png)](http://travis-ci.org/syranez/dhl)
# dhl

Querys the tracking page of a delivery service for the status of a sent package.

## Introduction

Get delivery progress.

    var tracking = require('dhl');

    var packet = {
        "service": "dhl",
        "id":      23
    };

    tracking.track(packet, function (tracking) {

        if (tracking.data.arrived === true) {
            console.log("arrived!");
        } else {
            console.log("not yet :(");
        }
    });

## Available delivery services

* dhl
* ups

## Installation
`npm install dhl`

... or to install the package globally:

`npm install -g dhl`

## Using

The version scheme is this:

    {major-release}-{feature-release}-{bugfixes/maintaining}

__Major­release numbers__ do not change so much. Indeed I have no plans to use some other digit than 1.  
__Feature-release numbers__ change if I introduce new features (e. g. the ups feature pushed dhl to 1.2.0 from 1.1.1).  
__Bugfixes/maintaining numbers__ increment every time I fix or do some maintaining stuff. Nothing is intended to break.  

If you are using dhl as dependency in your module, you have this version options:

* fixed version, e. g. 1.2.0 (very safe, nothing breaks, but you will not get any new stuff)
* describing bugfixes channel, e. g. 1.2.* (safe, nothing should break, bugs will be fixed.)
* bleeding edge channel, e. g. 1.* or even * (not safe, something will break, new bugs)

If you are not sure, use a fixed version.

## License

(The MIT License)

Copyright (c) 2012 Michael Nowack &lt;syranez@minaga-church.de&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
