#!/bin/env node
'use strict';
require('dotenv').config();

const { 
  JsonRpcProvider, 
  Contract 
} = require('ethers');

const { 
  chunk, 
  uniq 
} = require('lodash');

const { 
  ALCHEMY_API_KEY 
} = process.env;

const ERC721_ABI          = require('/Users/andrewwarner/Developer/Skillet/apps/openzeppelin-subgraphs/node_modules/@openzeppelin/contracts/build/contracts/IERC721Metadata.json').abi;

(async () => {
  
  const provider = new JsonRpcProvider( 'https://eth-mainnet.g.alchemy.com/v2/' + ALCHEMY_API_KEY);

  const collectionAddress = "0xf3e778f839934fc819cfa1040aabacecba01e049";
  const ownerAddress = "0xd387a6e4e84a6c86bd90c158c6028a58cc8ac459";
  const blockTag = undefined // 12291404;

  const ERC721Contract = new Contract(
    collectionAddress,
    ERC721_ABI,
    provider
  );

  const balance = await ERC721Contract.balanceOf(ownerAddress, {
    blockTag
  });

  console.log({
    blockTag,
    collectionAddress,
    ownerAddress,
    balance: balance.toString()
  });
})();