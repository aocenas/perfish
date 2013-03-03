var util = require('util');
var xmlparts = require('./xmlparts');
var et = require('elementtree');

console.log('exports= ' + util.inspect(xmlparts));
exports = module.exports = {};

var rules = [
  {
    name: 'debug',
    //active: true,
    xpath: 'stringProp[@name="HTTPSampler.path"]',
    fn: function (el) {
      console.log(util.inspect(el)); 
    }
  },
  {
    name: 'paydom_mid_replace',
    //active: true,
    xpath: './/stringProp[@name="HTTPSampler.path"]',
    fn: function (el) {
      var re = /\/mid\/\d+/i; // example: '...../mid/12'
      el.text = el.text.replace(re, '/mid/${PAYDOM_MID}');
    }
  },
  {
    name: 'insert_assertions',
    active: true,
    xpath: './/hashTree[HeaderManager]',
    fn: function (el) {
      console.log('xmlpart = ' + util.inspect(xmlparts.assertion));
      el.append(xmlparts.assertion.el);
      et.SubElement(el, 'hashTree');
    }
  }


];

exports.rules = rules;
