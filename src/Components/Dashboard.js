import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import TransferModal from '../Components/TransferModal';
import { 
  signData, 
  getEthBalance, 
  getTokenBalance,
  tokenContract 
} from './ethHelpers.js';

export default function Dashboard(props) {
  const { userAddress } = props;
  const [ ethBalance, setEthBalance ] = useState('0');
  const [ tokenBalance, setTokenBalance ] = useState('0');
  const [ showTransferModal, setShowTransferModal ] = useState(false);

  const handleTransferShow = () => setShowTransferModal(true);

  const assetSet = ['Bleep Token '];

  const ethLoadData = async () => {
    const newEthBalance = await getEthBalance(userAddress);
    const newTokenBalance = await getTokenBalance(userAddress);
    setEthBalance(newEthBalance);
    setTokenBalance(newTokenBalance);
  }

  const getSig = async () => { 
    const spender = '0x9E4C0363bC5A6F803B1Fefc51149C4BC4b8C1fBA';
    const value = 1000;
    const deadline = 1599693799;
    const nonce = 0;
    const sig = await signData(userAddress, spender, value, deadline, nonce);
  }

  useEffect(() => {
    ethLoadData();
  }, [ethLoadData]);

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
        <Button onClick={getSig}>Get Signature</Button>
        <TransferModal 
          showTransferModal={showTransferModal} 
          setShowTransferModal={setShowTransferModal} 
        />
        </div>
    </div>
  )
}
