example: 

    const {
        parseResult
    } = require('usf-parse-helpers');
    console.log(parseResult("2-2-3ft"));
    console.log(parseResult("0.80 Sec<sup>-1</sup>"));
    console.log(parseResult("75 g/min/f²"));
