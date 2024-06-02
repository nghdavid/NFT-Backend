const server_url = 'http://localhost:3000';
async function getSignature(account) {
  const response = await fetch(`api/1.0/signature?account=${account}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const signature_data = await response.json();
  return signature_data;
}

async function getProof(account) {
  const response = await fetch(`api/1.0/merkle_proof?account=${account}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const proof_data = await response.json();
  return proof_data;
}
