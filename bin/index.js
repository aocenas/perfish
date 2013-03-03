#!/usr/bin/env node

var argv = require('optimist')
  .usage('Usage: $0 [-t <controller name>] <filename>')
  .demand(1)
  //TODO find out how to better format these descriptions
  .describe('t', 'optional; name of the threadGroup,\n' +
            '\t\twhere the changes will be made. this will limit\n' +
            '\t\tthe scope on which the rules are applied.\n')
  .describe('<filename>', 'required; name of the xml file.')
  .argv;
var perfish = require('../index.js');

perfish.go(argv.t, argv._[0]);

