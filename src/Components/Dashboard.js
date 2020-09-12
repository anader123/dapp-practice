import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { 
  getEthBalance, 
  getBleepTokenBalance,
  getABleepTokenBalance,
  addressShortener
} from '../ethHelpers.js';

// Components
import LockTokens from '../Components/LockTokens';
import MintTokens from '../Components/MintTokens';

export default function Dashboard(props) {
  const { userAddress } = props;
  const [ shortAddress, setShortAddress ] = useState('');
  const [ ethBalance, setEthBalance ] = useState('0');
  const [ bleepTokenBalance, setBleepTokenBalance ] = useState('0');
  const [ aBleepTokenBalance, setABleepTokenBalance ] = useState('0');
  const [ step, setStep ] = useState(0);

  const returnBack = () => {
    setStep(0);
  }

  useEffect(() => {
    const ethLoadData = async () => {
      const shortAddress = await addressShortener(userAddress);
      setShortAddress(shortAddress);
      const newEthBalance = await getEthBalance(userAddress);
      const newBleepTokenBalance = await getBleepTokenBalance(userAddress);
      const newABleepTokenBalance = await getABleepTokenBalance(userAddress);
      setEthBalance(newEthBalance);
      setBleepTokenBalance(newBleepTokenBalance);
      setABleepTokenBalance(newABleepTokenBalance);
    };
    ethLoadData();
  }, [userAddress]);

  switch (step) {
    case 0:
      return(
        <div>
          <div className='dashboard-container'>
            <h5>{`Wallet Address: ${shortAddress}`}</h5>
            <h5>{`Ether Balance: ${ethBalance} ETH`}</h5>
            <h5>{`Bleep Balance: ${bleepTokenBalance} BLP`}</h5>
            <h5>{`aBleep Balance: ${aBleepTokenBalance} aBLP`}</h5>
          </div>
          <div className='button-container'>
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