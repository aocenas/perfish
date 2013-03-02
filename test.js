var main = require('./index.js');


exports = module.exports = {};

exports.testEscape = function (test) {
  var str = main.esc('</string test=\'jedna\' dva="tri">');
  test.equal(str, '<\\/string test=\\\'jedna\\\' dva=\\"tri\\">', 'bad escape');
  test.done();
}
