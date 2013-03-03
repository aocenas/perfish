#!/usr/bin/env node
var argv = require('optimist')
  .usage('Usage: $0 [-c <controller name>] <filename>')
  .describe('c', 'optional; name of the controler, \
            where the changes will be made')
  .describe('<filename>', 'required; name of the xml file')
  .argv;
var perfish = require('../index.js');

if (argv._.length === 0) { 
  console.log('<filename> is required'); 
  return 1;
}

perfish.go(argv.c, argv._[0]);


