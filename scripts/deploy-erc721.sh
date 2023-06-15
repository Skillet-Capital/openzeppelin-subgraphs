node ./scripts/top-erc721.js > configs/top-erc721.json
npx graph-compiler --config configs/top-erc721.json --include src/datasources --export-schema --export-subgraph
npx graph-cli build generated/top-erc721.subgraph.yaml
graph create --node http://107.178.212.219:8020/ skillet/erc721-mainnet
npx graph-cli deploy                      \
  --ipfs http://107.178.212.219:5001      \
  --node http://107.178.212.219:8020/     \
  skillet/erc721-mainnet                  \
  generated/top-erc721.subgraph.yaml