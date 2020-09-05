import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Web3 from 'web3';
import TestContract from '../abis/TestContract.json'

export default function Dashboard() {
  const [ web3, setWeb3 ] = useState({});
  const [ balance, setBalance ] = useState('0');
  const [ address, setAddress ] = useState('0');
  const [ tokenBalance, setTokenBalance ] = useState('0');
  const [ walletConnected, setWalletConnected ] = useState(false);

  const contractAddress = '0xA06e59D76E668b1141F23F3a14767E9e550C21b5';
  
  const connectWallet = async () => {
    if(window.ethereum && window.web3 ){
      const accounts = await window.ethereum.enable();
      const currentAddress = accounts[0];
      setAddress(currentAddress);
      setWalletConnected(true);
      const provider = window.web3.currentProvider;
      let newWeb3 = new Web3(provider);
      getEthBalance(currentAddress, newWeb3);
      setWeb3(newWeb3);
      const contractInstance = new newWeb3.eth.Contract(TestContract.abi, contractAddress);
      const newTokenBalance = await contractInstance.methods.name().call();
      console.log(newTokenBalance)
    }
    else {
      window.alert('No Ethereum Wallet Found');
    }
  }

  const getEthBalance = async (userAddress, newWeb3) => {
    try{
      const weiBalance = await newWeb3.eth.getBalance(userAddress);
      const ethBalance = newWeb3.utils.fromWei(weiBalance);
      setBalance(ethBalance);
    }
    catch (err) {
      console.error(err);
    }
  }

  const assetSet = ['Bleep']

  return (
    <div>
      {!walletConnected ?
        <div>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      :
       <div className='dashboard-container'>
        <h1>{`Wallet Address: ${address}`}</h1>
        <h2>{`Eth Balance: ${balance} ETH`}</h2>
        {assetSet.map(token => { 
          return (
            <Card style={{ width: '18rem', margin: '1rem', border: '2px solid black' }}>
              <Card.Img variant="top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iC78mg7jHzNvc7jJScInigAAAA%26pid%3DApi&f=1" />
              <Card.Body>
                <Card.Title style={{outline: 'none'}}>{token}</Card.Title>
                <Card.Text>
                  Info about token
                </Card.Text>
                <Card.Text>
                  Balance: 
                </Card.Text>
                <Button variant="primary">Transfer</Button>
              </Card.Body>
            </Card>
          )
        })}
       </div>
      }
    </div>
  )
}
