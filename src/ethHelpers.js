import Web3 from 'web3';
import BleepTokenContract from './abis/BleepTokenContract.json';
import TestDepositContract from './abis/TestDepositContract.json';

// Eth Related Vars
export let web3;
let bleepTokenContract;
let testDepositContract;
const bleepTokenAddress = '0xf7189e50cc020658e0f4E17E6eED37470A333c75'; //Kovan
const testDepositContractAddress = '0x6687BA38B7fBdfe62FAfB3f30FBA5219C6c6CEAC'; //Kovan

export const addressShortener = (address) => {
  if(address !== undefined) {
    const shortAddress = `${address.slice(0, 6)}...${address.slice(37, 42)}`;
    return shortAddress;
  }
}

// Initailize the web3 obj and contracts
export const initializeWeb3 = () => {
  try {
    const provider =  window.web3.currentProvider;
    web3 = new Web3(provider);
    bleepTokenContract = new web3.eth.Contract(BleepTokenContract.abi, bleepTokenAddress);
    testDepositContract = new web3.eth.Contract(TestDepositContract.abi, testDepositContractAddress);
    return web3;
  }
  catch (err) {
    throw new Error(`No inject web3: ${err}`);
  }
}

export const getEthBalance = async (userAddress) => {
  try {
    const weiEtherBalance = await web3.eth.getBalance(userAddress);
    const newEthBalance = web3.utils.fromWei(weiEtherBalance);
    return newEthBalance
  }
  catch (err) {
    console.error(err);
  }
}

export const getBleepTokenBalance = async (userAddress) => {
  try {
    const weiTokenBalance = await bleepTokenContract.methods.balanceOf(userAddress).call();
    const newTokenBalance = web3.utils.fromWei(weiTokenBalance);
    return newTokenBalance;
  }
  catch (err) {
    console.error(err);
  }
}

export const getABleepTokenBalance = async (userAddress) => {
   try {
    const weiTokenBalance = await testDepositContract.methods.balanceOf(userAddress).call();
    const newTokenBalance = web3.utils.fromWei(weiTokenBalance);
    return newTokenBalance;
   }
  catch (err) {
    console.error(err);
  }
}

export const mintTokens = async (amount, userAddress) => {
  try {
    const response = await bleepTokenContract.methods.mint(userAddress, amount).send({from: userAddress});
    return response.transactionHash;
  }
  catch (err) {
    console.error(err);
  }
}

// Gets current account nonce to create the sig 
export const getPermitNonce = async (userAddress) => {
  try {
    const nonce = await bleepTokenContract.methods.nonces(userAddress).call();
    return nonce;
  }
  catch (err) {
    console.error(err);
  }
}

// Swaps Bleep Tokens for aBleep Tokens
export const lockTokens = async (
  userAddress, 
  spender, 
  value, 
  deadline, 
  signature
  ) => {
  try {
    const response = await testDepositContract.methods.testDepositTokens(
      userAddress, 
      spender, 
      value, 
      deadline, 
      signature
      ).send({from: userAddress});
    return response.transactionHash;
  }
  catch (err) {
    console.error(err);
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


// Creates the signature
export const signData = async (
  owner,
  spender,
  value,
  deadline,
  nonce,
  callLockMethod
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
  await web3.currentProvider.sendAsync(
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
      callLockMethod(sig)
    }
  );
}

