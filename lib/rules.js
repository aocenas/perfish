var util = require('util');
var xmlparts = require('./xmlparts');
var et = require('elementtree');

console.log('exports= ' + util.inspect(xmlparts));
exports = module.exports = {};

//
// rules array, each rule is a hash with:
// name   - only to have some resolutions between different rules
// active - if active !== true then rule is not applied
// xpath  - xpath of the element you want to be passed into your function
// fn     - function to which the elment will be passed
// 
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
    active: true,
    xpath: './/stringProp[@name="HTTPSampler.path"]',
    fn: function (el) {
      var original = el.text;
      var re = /\/mid\/\d+/i; // example: '...../mid/12'
      el.text = el.text.replace(re, '/mid/${PAYDOM_MID}');
      if (el.text !== original) { this.changesCount++; }
    },
    changesCount: 0
  },
  {
    name: 'insert_assertions',
    active: true,
    xpath: './/hashTree[HeaderManager]',
    fn: function (el) {
      console.log('xmlpart = ' + util.inspect(xmlparts.assertion));
      el.append(xmlparts.assertion.el);
      et.SubElement(el, 'hashTree');
      this.changesCount++;
    },
    changesCount: 0
  }


];

exports.rules = rules;
