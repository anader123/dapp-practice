import Web3 from 'web3';
import BleepTokenContract from '../abis/BleepTokenContract.json';
const sigUtil = require('eth-sig-util');

// Eth Related Var
export let web3;
let bleepTokenContract;
let testDepositContract;
const bleepTokenAddress = '0x369a5b5bAe583b4F5E7FD5065662Dd48fC5Bb843';
const testDepositContractAddress = '';

export const initializeWeb3 = () => {
  try {
    const provider =  window.web3.currentProvider;
    web3 = new Web3(provider);
    bleepTokenContract = new web3.eth.Contract(BleepTokenContract.abi, bleepTokenAddress);
    return web3;
  }
  catch (err) {
    throw new Error(`No inject web3: ${err}`);
  }
}

export const getEthBalance = async (userAddress) => {
  const weiEtherBalance = await web3.eth.getBalance(userAddress);
  const newEthBalance = web3.utils.fromWei(weiEtherBalance);
  return newEthBalance
}

export const getTokenBalance = async (userAddress) => {
  const newTokenBalance = await bleepTokenContract.methods.balanceOf(userAddress).call();
  return newTokenBalance;
}

export const mintTokens = async (amount, userAddress) => {
  if(amount > 0) {
    const txHash = bleepTokenContract.methods.mint(amount).send({from: userAddress});
    return txHash;
  }
  else {
    window.alert('Please enter an amount before minting');
  }
}

// Signature Info
const domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" }
];

const Allow = [
  {name: "owner", type: "address"},
  {name: "spender", type: "address"},
  {name: "value", type: "uint256"},
  {name: "deadline", type: "uint256"},
  {name: "nonce", type: "uint8"}
];

export const signData = async (
  owner,
  spender,
  value,
  deadline,
  nonce
  ) => {
  
  const domainData = {
    name: "Bleep Token",
    version: "1",
    chainId: window.ethereum.networkVersion, // Should be Ropsten
    verifyingContract: bleepTokenAddress
  };
  const message = {
    owner,
    spender,
    value,
    deadline,
    nonce
  };
  
  const data = JSON.stringify({
    types: {
      EIP712Domain: domain,
      Allow
    },
    domain: domainData,
    primaryType: "Allow",
    message: message
  });

  const formattedSigner = web3.utils.toChecksumAddress(owner);
  web3.currentProvider.sendAsync(
    {
      method: "eth_signTypedData_v3",
      params: [formattedSigner, data],
      from: formattedSigner
    },
    function(err, result) {
      if (err) {
        return console.error(err);
      }
      const sig = result.result;
      console.log(sig);
      return sig;
    }
  );
}

export const verifySignature = async (
  owner, 
  value,
  channelNonce, 
  channelAddress,
  sig
) => {

  const domainData = {
    name: "Bleep Token",
    version: "1",
    chainId: window.ethereum.networkVersion, 
    verifyingContract: channelAddress
  };
  
  const message = {
    value: value,
    nonce: channelNonce
  };
  
  const data = JSON.stringify({
    types: {
      EIP712Domain: domain,
      Allow
    },
    domain: domainData,
    primaryType: "Allow",
    message: message
  });

  const recovered = sigUtil.recoverTypedSignature({ data: JSON.parse(data), sig: sig });
  const formattedRecovered = web3.utils.toChecksumAddress(recovered);
  const formattedSender = web3.utils.toChecksumAddress(owner);

  return formattedRecovered === formattedSender;
}