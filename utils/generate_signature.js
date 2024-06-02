const ethers = require('ethers');
require('dotenv').config();

const RPC_URL = process.env.RPC_URL;
const privateKey = process.env.DEV_PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(privateKey, provider);

const generateSignature = async (account) => {
  const msgHash = ethers.solidityPackedKeccak256(['address'], [account]);
  const messageHashBytes = ethers.getBytes(msgHash);
  const signature = await wallet.signMessage(messageHashBytes);
  return signature;
};

module.exports = {
  generateSignature,
};