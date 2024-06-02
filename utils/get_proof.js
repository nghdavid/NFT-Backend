const { StandardMerkleTree } = require('@openzeppelin/merkle-tree');
const { readFileSync } = require('fs');
const tree = StandardMerkleTree.load(
  JSON.parse(readFileSync('tree.json', 'utf8'))
);
const getProof = (account) => {
  let proof;
  for (const [i, v] of tree.entries()) {
    if (v[0].toLowerCase() === account.toLowerCase()) {
      proof = tree.getProof(i);
    }
  }
  if (proof) {
    return proof;
  } else {
    return null;
  }
};

module.exports = {
  getProof,
};
