'use strict';

exports.randInt = function (low, high, numElements) {
    var arr = [];

    numElements = numElements || 1;

    if (numElements > high - low + 1) throw new Error('Number of elements out of range');

    for (var i = 0; i < numElements; i++)
        arr.push(low + Math.round(Math.random() * (high - low)));

    return arr;
};

exports.randIntNoRep = function (low, high, numElements) {
    var arr = [];

    numElements = numElements || 1;

    if (numElements > high - low + 1) throw new Error('Number of elements out of range');

    for (var i = 0; true; i++) {
        var num = low + Math.round(Math.random() * (high - low));
        if (arr.indexOf(num) === -1) arr.push(num);
        if (arr.length === numElements) break;
    }

    return arr;
};

exports.systematic = function (numSeparate, max) {

    if (!max) {
        console.warn('Please specify the maximum number of elements to choose from');
        return;
    } else if (max < numSeparate) throw new Error('Invalid maximum number of elements');

    var arr = [];

    for (var i = exports.randInt(0, numSeparate-1)[0]; i < max; i += numSeparate)
        arr.push(i);

    return arr;
};
