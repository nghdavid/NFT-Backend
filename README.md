# NFT_Backend

**Backend and Frontend of [NFT whitelist](https://github.com/nghdavid/NFT)**

## Main Features

- **Efficient Gas Usage**: Save whitelists in a **Merkle tree** to reduce gas costs.
- **Flexible Whitelist Issuance**: Issue whitelists to users with **EIP-191** signatures.
- **Tamper-Proof RNG**: Utilize **ChainLink VRF** to prevent manipulation of the random number generator by hackers.

## Backend Technique
- Ethers.js
- Express.js
- Openzeppelin/merkle-tree

## How to start my project
- Install Node.js(v20.12.2)
- Run: npm i
- Create .env
- Run utils/generate_merkle_tree.js
- Move tree.json to main directory
- node app.js or docker-compose up -d