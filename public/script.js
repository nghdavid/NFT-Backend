import { ethers } from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.12.1/ethers.js';
const ethereumButton = document.querySelector('.connect');
const showAccount = document.querySelector('.showAccount');
const showETHBalance = document.querySelector('.showETHBalance');
const merkleButton = document.querySelector('.merkle');
const signatureButton = document.querySelector('.signature');

ethereumButton.addEventListener(`click`, metamaskHandler);
merkleButton.addEventListener(`click`, randomMintByMerkleTree);
signatureButton.addEventListener(`click`, randomMintBySignature);

let account;
let signer;
async function metamaskHandler() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);
  account = accounts[0];
  showAccount.innerHTML = account;
  signer = await provider.getSigner();
  const { chainId } = await provider.getNetwork();
  if (Number(chainId) !== 421614) {
    Swal.fire({
      title: 'Wrong network!',
      text: 'Please connect to the Arbitrum sepolia network',
      icon: 'error',
    });
    return;
  }
  const balance = await provider.getBalance(signer.getAddress());
  showETHBalance.innerHTML = ethers.formatUnits(balance);
  document.getElementById('merkle').style.display = 'block';
  document.getElementById('signature').style.display = 'block';
}

async function randomMintByMerkleTree() {
  const proof = await getProof(account);
  if("error" in proof) {
    Swal.fire({
      title: 'Something went wrong!',
      text: proof.error,
      icon: 'error',
    });
  }

  const abiMerkleTree = [
    'function mintMerkleProofRealRandom(address, bytes32[]) external returns (uint256)',
    'event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)',
  ];

  const alchemy_provider = new ethers.JsonRpcProvider(RPC_URL);
  const contractNFTMonitor = new ethers.Contract(
    addressNFT,
    abiMerkleTree,
    alchemy_provider
  );

  contractNFTMonitor.once('Transfer', (from, to, tokenId) => {
    console.log(`${from} -> ${to} Token id is ${tokenId}`);
    Swal.fire({
      title: 'Successfully minted NFT by Merkle Tree!',
      text: `Token id is ${tokenId}`,
      icon: 'success',
    });
  });

  const contractNFT = new ethers.Contract(addressNFT, abiMerkleTree, signer);

  try {
    const tx = await contractNFT.mintMerkleProofRealRandom(account, proof.proof);
    await tx.wait();
    console.log('Minted NFT by Merkle Tree successfully!');
  } catch (error) {
    console.error('Error minting NFT by Merkle Tree:', error);
  }
}

async function randomMintBySignature() {
  const signature = await getSignature(account);
  if ('error' in signature) {
    Swal.fire({
      title: 'Something went wrong!',
      text: signature.error,
      icon: 'error',
    });
  }

  const abiSignature = [
    'function mintSignatureRealRandom(address, bytes) external returns (uint256)',
    'event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)',
  ];

  const alchemy_provider = new ethers.JsonRpcProvider(RPC_URL);
  const contractNFTMonitor = new ethers.Contract(
    addressNFT,
    abiSignature,
    alchemy_provider
  );

  contractNFTMonitor.once('Transfer', (from, to, tokenId) => {
    console.log(`${from} -> ${to} Token id is ${tokenId}`);
    Swal.fire({
      title: 'Successfully minted NFT by Signature!',
      text: `Token id is ${tokenId}`,
      icon: 'success',
    });
  });

  const contractNFT = new ethers.Contract(addressNFT, abiSignature, signer);

  try {
    const tx = await contractNFT.mintSignatureRealRandom(
      account,
      signature.signature
    );
    await tx.wait();
    console.log('Minted NFT by Signature successfully!');
  } catch (error) {
    console.error('Error minting NFT by Signature:', error);
  }
}