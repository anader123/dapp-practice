import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { 
  signData, 
  getEthBalance, 
  getTokenBalance,
  tokenContract 
} from './ethHelpers.js';

// Components
import LockTokens from '../Components/LockTokens';
import MintTokens from '../Components/MintTokens';

export default function Dashboard(props) {
  const { userAddress } = props;
  const [ ethBalance, setEthBalance ] = useState('0');
  const [ tokenBalance, setTokenBalance ] = useState('0');
  const [ step, setStep ] = useState(0);

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

  const returnBack = () => {
    setStep(0);
  }

  useEffect(() => {
    ethLoadData();
  }, [ethLoadData]);

  switch (step) {
    case 0:
      return(
        <div>
          <div className='dashboard-container'>
            <h2>{`Wallet Address: ${userAddress}`}</h2>
            <h3>{`Eth Balance: ${ethBalance} ETH`}</h3>
          </div>
          <div>
              <Button onClick={()=>setStep(1)}>Mint Tokens</Button>
              <Button onClick={()=>setStep(2)}>Lock Tokens</Button>
          </div>
        </div>
      )
    case 1: 
      return(
        <MintTokens returnBack={returnBack} />
      )
    case 2:
      return(
        <LockTokens returnBack={returnBack} />
      )
    default:
      break;
  }
}