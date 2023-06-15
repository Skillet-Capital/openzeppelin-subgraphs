#!/bin/env node
'use strict';
require('dotenv').config();

const axios               = require('axios');
const { chunk, uniq }     = require('lodash');
const { ALCHEMY_API_KEY } = process.env;

async function fetchBatchMetadata(addresses) {
  const url = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}/getContractMetadataBatch`;

  const chunks = chunk(addresses, 50);
  return await Promise.all(chunks.map(
    (chunkedAddresses) => axios({
      method: 'POST',
      url,
      data: {
        contractAddresses: chunkedAddresses
      }
    }).then((response) => response.data)
  )).then((_metadata) => _metadata.flat())
    .then((_metadata) => _metadata.map(
      (_contract) => ({
        address: _contract.address,
        startBlock: _contract.contractMetadata.deployedBlockNumber
      })
    ))
}

(async () => {

  const whitelist = require('../data/erc721-whitelist.json');

  const addresses = uniq(whitelist.sort((a, b) => a.localeCompare(b)));

  const metadata = await fetchBatchMetadata(addresses);



  console.log(JSON.stringify({
    output: "generated/top-erc721.",
    chain: "mainnet",
    datasources: metadata.map(({ address, startBlock }) => ({ address, startBlock: startBlock ?? 5806610, module: "erc721Balance"}))
  }, null, null))
})();
