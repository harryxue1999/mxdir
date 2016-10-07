#!/bin/env node

'use strict';

var compute = require('./compute');
var list = require('./names.json');

var result = [];

compute.randIntNoRep(0, list.length-1, 30).forEach(function (i) {
    result.push(list[i]);
});

console.log(result.sort());
