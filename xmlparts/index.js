var et = require('elementtree');
var fs = require('fs');
var util = require('util');
var path = require('path');
var xmlParts = {};


var files = fs.readdirSync(__dirname);
files.forEach(function (file) {
  if (path.extname(file) == '.xml') {
    //console.log(file);
    var part = {};
    part.text = fs.readFileSync(path.join(__dirname, file)).toString();
    part.el = et.parse(part.text).getroot();
    xmlParts[path.basename(file, '.xml')] = part;
  }
});

exports = module.exports = xmlParts;

//console.log(util.inspect(xmlParts));
