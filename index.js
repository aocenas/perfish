var fs = require('fs');
var xos = require('xml-object-stream');
var util = require('util');
var sax = require("sax"),
  strict = true, // set to false for html-mode
  parser = sax.parser(strict);
var saxStream = require("sax").createStream(strict);
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
    name: 'paydom_mid replace',
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

var stream = fs.createReadStream(fileName, {encoding: 'utf8'});
var xml = xos.parse(stream);

data = fs.readFileSync(fileName).toString();
etree = et.parse(data);

rules.forEach(function (rule) {
  if (rule.active) {
    etree.findall(rule.xpath).forEach(function (el) {
      rule.fn(el);
    });
  }
});



//console.log(util.inspect(etree.findall('stringProp[@name="HTTPSampler.path"]')[0]));
//etree.findall('stringProp[@name="HTTPSampler.path"]')[0].text = 'test';
console.log(etree.write());

//saxStream.on("opentag", function (node) {
  //console.log(util.inspect(node));
  //rules.forEach(function (rule) {
    //if(rule.active) {
      //console.log(rule.node.name);
      //if(elMatch(node, rule)) {
        //rule.fn(node);
      //}
    //}
  //});
//})

//fs.createReadStream(fileName)
  //.pipe(saxStream)
  //.pipe(fs.createWriteStream("file-copy.xml"));

//rules.forEach(function (rule) {
  //if(rule.active) {
    //console.log(rule.node.name);
    //xml.each(rule.node.name, function (el) {
      //if(elMatch(el, rule)) {
        //rule.fn(el);
      //}
    //});
  //}
//});
//xml.each('stringProp', function (item) {
  //if (item.$.name == 'HTTPSampler.path') {
    //console.log(item.$text);
  //}
//});

