'use strict';

var fs = require('fs');

fs.exists('./pdf.json', function (exists) {
    if (exists) {
        // TODO
    }
});

var json = require('./pdf.json');

var standardize = function (string) {
    return string.replace(/%20/g,' ').replace(/%2C/g, ',').replace('*', '');
};

var arr = [];

var pages = json.formImage.Pages;

for (var i = 0; i < pages.length; i++) {
    for (var j = 0; j < pages[i].Texts.length; j++) {
        var text = standardize(pages[i].Texts[j].R[0].T);
        if (/^\w+, \D+$/.test(text)
        && /[^\%]/.test(text)
        && arr[arr.length-1] !== text) {
            arr.push({
                name: text,
                grade: pages[i].Texts[j+1].R[0].T.split('%20')[1],
                gender: pages[i].Texts[j+1].R[0].T.split('%20')[2]
            });
        }
    }
}

fs.writeFile('names.json', JSON.stringify(arr));
