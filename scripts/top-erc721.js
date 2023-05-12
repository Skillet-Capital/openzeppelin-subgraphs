#!/bin/env node
'use strict';

const { uniq } = require('lodash');

const whitelist = require('../data/erc721-whitelist.json');

const addresses = uniq(whitelist.sort((a, b) => a.localeCompare(b)))

console.log(JSON.stringify({
  output: "generated/top-erc721.",
  chain: "mainnet",
  datasources: addresses.map(address => ({ address, module: "erc721"}))
}, null, null))
