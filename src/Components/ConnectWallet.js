import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Web3 from 'web3';
import TestContract from '../abis/TestContract.json';

export default function ConnectWallet(props) {
  const { setWeb3 , setWalletConnected, setUserAddress, setTokenContract } = props;

  // Token Contract Address
  const contractAddress = '0xd577a8B8f2650587639DbB3285932deBAe061Ef3';

  const connectWallet = async () => {
    if(window.ethereum && window.web3) {
      try {
        const accounts = await window.ethereum.enable();
        setUserAddress(accounts[0]);
        let web3 = new Web3(window.web3.currentProvider);
        await setWeb3(web3);
        await initializeTokenContract(web3);
        setWalletConnected(true);
      }
      catch (err) {
        console.error(err);
      }
    }
    else {
      window.alert('No Ethereum wallet detected');
    }
  }

  const initializeTokenContract = async (web3) => {
    const tokenContract = new web3.eth.Contract(TestContract.abi, contractAddress);
    setTokenContract(tokenContract);
  }

  return (
    <div>
      <Button onClick={connectWallet}>Connect Wallet</Button> 
    </div>
  )
}
