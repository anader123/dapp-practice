import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Web3 from 'web3';
import TestContract from '../abis/TestContract.json'

export default function Dashboard(props) {
  const { userAddress, web3 } = props;
  const [ ethBalance, setEthBalance ] = useState('0');
  const contractAddress = '0xA06e59D76E668b1141F23F3a14767E9e550C21b5';
  const assetSet = ['Bleep Token '];

  const getEthBalance = async () => {
    const weiEtherBalance = await web3.eth.getBalance(userAddress);
    const newEthBalance = web3.utils.fromWei(weiEtherBalance);
    setEthBalance(newEthBalance);
  }  

  useEffect(() => {
    getEthBalance();
  }, [])

  return (
    <div>
      <div className='dashboard-container'>
      <h2>{`Wallet Address: ${userAddress}`}</h2>
      <h3>{`Eth Balance: ${ethBalance} ETH`}</h3>
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
    </div>
  )
}
