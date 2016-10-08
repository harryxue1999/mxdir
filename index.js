'use strict';

var fs = require('fs');

// Checks if pdf.json exists. If not, generate one.
fs.exists('./pdf.json', function (exists) {

    if (!exists) {
        // TODO
    }

    var json = require('./pdf.json');

    /**
     * Standardize html escape strings to normal strings
     *
     * @param {String} string
     */
    var standardize = function (string) {
        return string.replace(/%20/g,' ').replace(/%2C/g, ',').replace('*', '');
    };

    /**
     * Formats array into a beautified version
     *
     * @param {Array} arr
     */
    var formatArr = function (arr) {
        return JSON.stringify(arr)
            .split('{')
            .join('{ ')
            .split('},')
            .join(' },\n');
    };

    var arr = [];

    var pages = json.formImage.Pages;

    // Cycles through each page
    for (var i = 0; i < pages.length; i++) {

        // Cycles through each string block
        for (var j = 0; j < pages[i].Texts.length; j++) {
            var name1 = standardize(pages[i].Texts[j].R[0].T);

            // Checks if the text of the block is in fact a string
            if (/^\w+, \D+$/.test(name1)&& /[^\%]/.test(name1)) {

                // Determines if the name is unique
                var unique = arr.length === 0 || arr[arr.length-1].name.indexOf(name1) === -1;

                // Determines if the name has a second part (sibling notation workaround)
                var name2 = standardize(pages[i].Texts[j+1].R[0].T);
                if (name2.indexOf('(') !== 0) name2 = null;

                // Grade level
                var grade = name2 ? +pages[i].Texts[j+2].R[0].T.split('%20')[1]
                    : +pages[i].Texts[j+1].R[0].T.split('%20')[1];

                // Gender
                var gender = name2 ? pages[i].Texts[j+2].R[0].T.split('%20')[2]
                    : pages[i].Texts[j+1].R[0].T.split('%20')[2];

                // Checks if all three parts a present (a valid person)
                var valid = unique && grade && gender;

                // Pushes the information of the person into the array
                if (valid) arr.push({
                    name: name1 + (name2 ? ' ' + name2 : ''),
                    grade: grade,
                    gender: gender
                });
            }
        }
    }

    fs.writeFile('names.json', formatArr(arr));

});
