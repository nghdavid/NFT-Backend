const { StandardMerkleTree } = require('@openzeppelin/merkle-tree');
const { fs } = require('fs');

// Add or delete the addresses as needed
const values = [
  ['0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'],
  ['0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2'],
  ['0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db'],
  ['0x7F72dDF0e619F9B1600D9B68979BD5a3F21C01E7'],
];

const tree = StandardMerkleTree.of(values, ['address']);

// Intialize the NFT contract with tree.root
console.log('Merkle Root:', tree.root);
// Remember to move the tree.json file to the main folder
fs.writeFileSync('tree.json', JSON.stringify(tree.dump()));