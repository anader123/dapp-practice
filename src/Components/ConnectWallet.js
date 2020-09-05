import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Web3 from 'web3';

export default function ConnectWallet(props) {
  const { setWeb3 , setWalletConnected, setUserAddress } = props;

  const connectWallet = async () => {
    if(window.ethereum && window.web3) {
      try {
        const accounts = await window.ethereum.enable();
        setUserAddress(accounts[0]);
        let web3 = new Web3(window.web3.currentProvider);
        setWeb3(web3);
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

  return (
    <div>
      <Button onClick={connectWallet}>Connect Wallet</Button> 
    </div>
  )
}
