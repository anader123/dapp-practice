import Web3 from 'web3';
import BleepTokenContract from '../abis/BleepTokenContract.json';
const sigUtil = require('eth-sig-util');

// Eth Related Var
let web3;
let tokenContract;
const tokenContractAddress = '0x87F199F08e1BE5f5124E1893b087FcAb8e767a98';

export const initializeWeb3 = () => {
  try {
    const provider =  window.web3.currentProvider;
    web3 = new Web3(provider);
    tokenContract = new web3.eth.Contract(BleepTokenContract.abi, tokenContractAddress);
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
  const newTokenBalance = await tokenContract.methods.balanceOf(userAddress).call();
  return newTokenBalance;
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
    verifyingContract: tokenContractAddress
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