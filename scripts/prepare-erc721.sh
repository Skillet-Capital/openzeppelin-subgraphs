node ./scripts/top-erc721.js > configs/top-erc721.json
npx graph-compiler --config configs/top-erc721.json --include src/datasources --export-schema --export-subgraph
npx graph-cli build generated/top-erc721.subgraph.yaml