var fs = require('fs');
var util = require('util');
var et = require('elementtree');


exports = module.exports = {};

var esc = function (str) {
  return str
    .replace(/\//g, '\\/')
    .replace(/\"/g, '\\\"')
    .replace(/\'/g, '\\\'');
};

var rules = [
  {
    name: 'debug',
    active: true,
    node: {
      name: 'stringProp',
      attr: {
        name: 'HTTPSampler.path'
      }
    },
    xpath: 'stringProp[@name="HTTPSampler.path"]',
    fn: function (el) { 
      console.log(util.inspect(el)); 
    }
  },
  {
    name: 'paydom_mid_replace',
    active: true,
    node: {
      name: 'stringProp',
      attr: { 
        name: 'HTTPSampler.path'
      }
    },
    xpath: 'stringProp[@name="HTTPSampler.path"]',
    fn: function (el) {
      var re = /\/mid\/\d+/i; // example: '...../mid/12'
      el.text = el.text.replace(re, '/mid/${PAYDOM_MID}');
    }
  }
];


exports.esc = esc;
exports.rules = rules;

var fileName = './test.xml';
//var fileName = './TEST_EXECUTOR_R4.jmx';

data = fs.readFileSync(fileName).toString();
etree = et.parse(data);

rules.forEach(function (rule) {
  if (rule.active) {
    etree.findall(rule.xpath).forEach(function (el) {
      rule.fn(el);
    });
  }
});



console.log(etree.write());
fs.writeFileSync(fileName + '.new', etree.write({indent: 2}));

