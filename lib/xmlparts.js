var et = require('elementtree');
var fs = require('fs');
var util = require('util');
var path = require('path');
var xmlParts = {};
var xmlPartsDir = path.join(__dirname, '../xmlparts');

var files = fs.readdirSync(xmlPartsDir);
files.forEach(function (file) {
  if (path.extname(file) == '.xml') {
    //console.log(file);
    var part = {};
    part.text = fs.readFileSync(path.join(xmlPartsDir, file)).toString();
    part.el = et.parse(part.text).getroot();
    xmlParts[path.basename(file, '.xml')] = part;
  }
});

exports = module.exports = xmlParts;

//console.log(util.inspect(xmlParts));
