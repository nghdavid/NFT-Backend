require('dotenv').config();
const { ethers } = require("ethers");
const { generateSignature } = require('../utils/generate_signature.js');
const { getProof } = require('../utils/get_proof.js');

const signature = async (req, res, next) => {
  const account = req.query.account;
  if (!ethers.isAddress(account)) {
    return res.status(400).json({ error: 'Invalid address' });
  }
  const signature = await generateSignature(account);
  return res.status(200).json({ signature });
};

const proof = async (req, res, next) => {
  const account = req.query.account;
  if (!ethers.isAddress(account)) {
    return res.status(400).json({ error: 'Invalid address' });
  }
  const proof = getProof(account);
  if (!proof) {
    return res.status(400).json({ error: 'Account not in merkle tree' });
  }
  return res.status(200).json({ proof });
};

module.exports = {
  signature,
  proof
};