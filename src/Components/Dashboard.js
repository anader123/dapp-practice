import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import TransferModal from '../Components/TransferModal';

export default function Dashboard(props) {
  const { userAddress, web3, tokenContract } = props;
  const [ ethBalance, setEthBalance ] = useState('0');
  const [ tokenBalance, setTokenBalance ] = useState('0');
  const [ showTransferModal, setShowTransferModal ] = useState(false);

  const handleTransferShow = () => setShowTransferModal(true);

  const contractAddress = '0xd577a8B8f2650587639DbB3285932deBAe061Ef3';
  const assetSet = ['Bleep Token '];

  const getEthBalance = async () => {
    const weiEtherBalance = await web3.eth.getBalance(userAddress);
    const newEthBalance = web3.utils.fromWei(weiEtherBalance);
    setEthBalance(newEthBalance);
  }

  const getTokenBalance = async () => {
    console.log(tokenContract);
    const newTokenBalance = await tokenContract.methods.balanceOf(userAddress).call();
    setTokenBalance(newTokenBalance);
  }
  useEffect(() => {
    getEthBalance();
    getTokenBalance();
  }, []);

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
                  Balance: {tokenBalance} BLP
                </Card.Text>
                <Button onClick={handleTransferShow} variant="primary">Transfer</Button>
              </Card.Body>
            </Card>
          )
        })}
        <TransferModal 
          showTransferModal={showTransferModal} 
          setShowTransferModal={setShowTransferModal} 
        />
        </div>
    </div>
  )
}
