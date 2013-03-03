var fs = require('fs');
var util = require('util');
var et = require('elementtree');
var path = require('path');

exports = module.exports = {};

//
// main func which applies all active rules
// TODO: handle the controller variable to limit the scope of changes
//
var go = function (controller, fileName) {
  var rules = require('./lib/rules.js').rules;

  data = fs.readFileSync(fileName).toString();
  etree = et.parse(data);
  
  // apply each rule
  rules.forEach(function (rule) {
    if (rule.active) {
      var elements = etree.findall(rule.xpath);
      //console.log(elements);
      elements.forEach(function (el) {
        var original = el.text;
        rule.fn(el);
      });
      if (rule.changesCount) {
        console.log(rule.name + ': ' + rule.changesCount);
      }
    }
  });

  //console.log(etree.write());
  //TODO: hardcoded file name, move to some config/parameter
  fs.writeFileSync('new_' + path.basename(fileName), etree.write({indent: 2}));

}

exports.go = go;
