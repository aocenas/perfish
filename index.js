var fs = require('fs');
var util = require('util');
var et = require('elementtree');
var path = require('path');

exports = module.exports = {};

//
// main func which applies all active rules
//
var go = function (threadGroupName, fileName) {
  var rules = require('./lib/rules.js').rules;

  data = fs.readFileSync(fileName).toString();
  etree = et.parse(data);

  var threadGroup = null;
  var hashTree = null;
  if (threadGroupName) {
    //
    // in jmeter, threadGroup is one element and all it subelements are in its
    // hastree. the problem is that this hashTree is actualy its sibling 
    // element. so this code should handel that.
    //
    threadGroup = etree
        .find('.//ThreadGroup[@testname="' + threadGroupName + '"]');
    console.log(util.inspect(threadGroup));
    var hashTreeId =  threadGroup
        ._children[threadGroup._children.length - 1]._id + 1;
    var allHashTrees = etree.findall('.//hashTree');
    allHashTrees.forEach(function (tree) {
      if (tree._id == hashTreeId) {
        hashTree = tree;
      }
      return false;
    });
    console.log(util.inspect(hashTree));
  }

  // apply each rule
  rules.forEach(function (rule) {
    if (rule.active) {
      var elements;
      if (threadGroup && hashTree) {
        elements = hashTree.findall(rule.xpath);
        elements = elements.concat(threadGroup.findall(rule.xpath))
      } else {
        elements = etree.findall(rule.xpath);
      }

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
