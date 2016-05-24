#!/usr/bin/env node
'use strict';
const program = require('commander');

program
  .version('0.0.1')
  .command('json [file]','imports products from a json file')
  .command('nod-b2b-api', 'imports products from Network One B2B api');
  
program.parse(process.argv);