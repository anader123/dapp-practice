import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { 
  getEthBalance, 
  getBleepTokenBalance,
  getABleepTokenBalance
} from './ethHelpers.js';

// Components
import LockTokens from '../Components/LockTokens';
import MintTokens from '../Components/MintTokens';

export default function Dashboard(props) {
  const { userAddress } = props;
  const [ ethBalance, setEthBalance ] = useState('0');
  const [ bleepTokenBalance, setBleepTokenBalance ] = useState('0');
  const [ aBleepTokenBalance, setABleepTokenBalance ] = useState('0');
  const [ step, setStep ] = useState(0);

  const ethLoadData = async () => {
    const newEthBalance = await getEthBalance(userAddress);
    const newBleepTokenBalance = await getBleepTokenBalance(userAddress);
    const newABleepTokenBalance = await getABleepTokenBalance(userAddress);
    setEthBalance(newEthBalance);
    setBleepTokenBalance(newBleepTokenBalance);
    setABleepTokenBalance(newABleepTokenBalance);
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
          {/* <div className='dashboard-container'>
            <h2>{`Wallet Address: ${userAddress}`}</h2>
            <h3>{`Eth Balance: ${ethBalance} ETH`}</h3>
            <h3>{`Bleep Token Balance: ${bleepTokenBalance} BLP`}</h3>
            <h3>{`aBleep Token Balance: ${aBleepTokenBalance} aBLP`}</h3>
          </div> */}
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