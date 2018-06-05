'use strict';

const list = require('./names.json');
const compute = require('./compute');

var boysList = [], girlsList = [];

/**
 * Formats array into a beautified version
 *
 * @param {Array} arr
 */
var formatArr = function (arr) {
    return JSON.stringify(arr)
        .split('[')
        .join('[ ')
        .split('],')
        .join(' ],\n');
};

list.forEach(item => {
    if (item.gender === 'Male') boysList.push(item);
    else girlsList.push(item);
});

var overflow = boysList.length < girlsList.length ? 'Female' : 'Male';
var less = boysList.length < girlsList.length ? boysList.length : girlsList.length;
// var delta = Math.abs(boysList.length - girlsList.length);

var boysListIndex = compute.randIntNoRep(0, boysList.length-1, less);
var girlsListIndex = compute.randIntNoRep(0, girlsList.length-1, less);

var result = [];

for (var i = 0; i < less; i++) {
    result.push([boysList[boysListIndex[i]].name, girlsList[girlsListIndex[i]].name]);
}

if (overflow === 'Male') {
    var overflowedIndex = [];

    for (i = 0; i < boysList.length; i++) {
        if (boysListIndex.indexOf(i) === -1) overflowedIndex.push(i);
    }

    for (i = 0; i < overflowedIndex.length; i++) {
        result[i].push(boysList[overflowedIndex[i]].name);
    }
} else {
    var overflowedIndex = [];

    for (i = 0; i < girlsList.length; i++) {
        if (girlsListIndex.indexOf(i) === -1) overflowedIndex.push(i);
    }

    for (i = 0; i < overflowedIndex.length; i++) {
        result[i].push(girlsList[overflowedIndex[i]].name);
    }
}

// Generates JSON
require('fs').writeFile('./random-dance.json', formatArr(result));

// Generate CSV
(function (str) {
    var file = str.replace(/\[ /g, '')
        .replace(/(\],)|(\]\])/g, '')
        .replace(/\"/g, '');

    fs.writeFile('random-dance.csv', file);
})(formatArr(result));
