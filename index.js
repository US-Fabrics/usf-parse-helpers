const {
    each,
} = require('lodash');

let printMsg = function () {
    console.log("usf-parse-helpers loaded");
}

let isNumeric = (str) => {
    return /^\d+$/.test(str);
}

let getSuperscriptContents = (str) => {
    let matches = str.match(/<sup>(.*?)<\/sup>/g);
    return matches ? matches.map(function (val) {
        return val.replace(/<\/?sup>/g, '');
    }) : undefined;
}

let stripSupercript = (str) => {
    str = str.replace("<sup>-1</sup>", '');
    str = str.replace("<sup>1</sup>", '');
    str = str.replace("<sup>2</sup>", '');
    str = str.replace("<sup>3</sup>", '');
    str = str.replace("<sup>4</sup>", '');
    str = str.replace("<sup>5</sup>", '');
    str = str.replace("<sup>(1)</sup>", '');
    str = str.replace("<sup>(2)</sup>", '');
    str = str.replace("<sup>(3)</sup>", '');
    str = str.replace("<sup>(4)</sup>", '');
    str = str.replace("<sup>(5)</sup>", '');
    str = str.replace("<sup>(1,2)</sup>", '');
    str = str.replace("<sub>", ' ');
    str = str.replace("</sub>", ' ');
    return str;
}

let fixSupercript = (str) => {
    str = str.replace("<sup>-1</sup>", '⁻¹');
    str = str.replace("<sup>1</sup>", '¹');
    str = str.replace("<sup>2</sup>", '²');
    str = str.replace("<sup>3</sup>", '³');
    str = str.replace("<sup>4</sup>", '⁴');
    str = str.replace("<sup>5</sup>", '⁵');
    str = str.replace("<sup>(1)</sup>", '⁽¹⁾');
    str = str.replace("<sup>(2)</sup>", '⁽²⁾');
    str = str.replace("<sup>(3)</sup>", '⁽³⁾');
    str = str.replace("<sup>(4)</sup>", '⁽⁴⁾');
    str = str.replace("<sup>(5)</sup>", '⁽⁵⁾');
    str = str.replace("<sup>(1,2)</sup>", '⁽¹⁾⁽²⁾');
    return str;
}
let parseResult = (item) => {
    let result = item;
    result = result.replace(/\s/g, '');
    result = fixSupercript(result);
    let unit = "";
    let separator = 'x';

    // determine separator and split into value parts
    let parts = result.split('x');
    if (parts.length == 1) {
        parts = result.split('-');
        if (parts.length > 1) {
            separator = 'hyphen';
        }
    }

    //iterate each part and also determine value and unit and apply to results array
    let results = [];
    each(parts, part => {
        var index_of_last_digit = 0;
        // determine unit by stepping back from the end and locate the first numeric value assume the rest is the unit
        for (var i = part.length - 1; i > 0; i--) {
            if (isNumeric(part.charAt(i))) {
                index_of_last_digit = i;
                break;
            }
        }
        let value = part.substr(0, index_of_last_digit + 1).replace(/[^0-9.]/g, "");
        results.push(value);
        unit = part.substr(index_of_last_digit + 1);
    })
    let response = {
        item,
        results,
        unit,
        separator
    }
    return response;
}

module.exports = {
    printMsg,
    isNumeric,
    fixSupercript,
    stripSupercript,
    parseResult,
    getSuperscriptContents
}