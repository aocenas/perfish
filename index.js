var fs = require('fs');
var util = require('util');
var et = require('elementtree');
var rules = require('./rules').rules;


var changeCounter = Object.create(null);

//var fileName = 'test.xml';
//var fileName = 'TEST_EXECUTOR_R4.jmx';
var fileName = 'assertion_test.xml';

data = fs.readFileSync(fileName).toString();
etree = et.parse(data);

rules.forEach(function (rule) {
  if (rule.active) {
    var elements = etree.findall(rule.xpath);
    //console.log(elements);
    elements.forEach(function (el) {
      var original = el.text;
      rule.fn(el);
      if (original !== el.text) {
        changeCounter[rule.name] = changeCounter[rule.name] || 0;
        changeCounter[rule.name]++;
      }
    });
  }
});


console.log(util.inspect(changeCounter));
//console.log(etree.write());
fs.writeFileSync('new_' + fileName, etree.write({indent: 2}));

