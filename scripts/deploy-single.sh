# create subgraph manifest and generate yaml
npx graph-compiler --config configs/single-erc721.json --include src/datasources --export-schema --export-subgraph
npx graph codegen generated/single-erc721.subgraph.yaml

npx graph create --node http://107.178.212.219:8020/ skillet/single-erc721

# deploy single erc721 subgraph
npx graph deploy                          \
  --ipfs http://107.178.212.219:5001      \
  --node http://107.178.212.219:8020/     \
  skillet/single-erc721                   \
  generated/single-erc721.subgraph.yaml