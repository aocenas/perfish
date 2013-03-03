var fs = require('fs');
var util = require('util');
var et = require('elementtree');
var path = require('path');

exports = module.exports = {};

var go = function (controler, fileName) {
  var rules = require('./lib/rules.js').rules;


  //var fileName = 'test.xml';
  //var fileName = 'TEST_EXECUTOR_R4.jmx';
  //var fileName = 'assertion_test.xml';

  data = fs.readFileSync(fileName).toString();
  etree = et.parse(data);

  rules.forEach(function (rule) {
    if (rule.active) {
      var elements = etree.findall(rule.xpath);
      //console.log(elements);
      elements.forEach(function (el) {
        var original = el.text;
        rule.fn(el);
      });
    }
  });


  //console.log(etree.write());
  fs.writeFileSync('new_' + path.basename(fileName), etree.write({indent: 2}));

}

exports.go = go;
