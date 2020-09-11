import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { 
  signData, 
  getPermitNonce, 
  lockTokens, 
  web3 
} from '../ethHelpers';
import lockIcon from '../images/lock-icon.png';
import TxStatus from '../Components/TxStatus';

export default function LockTokens(props) {
  const { returnBack } = props;
  const [ lockAmount, setLockAmount ] = useState(0);
  const [ step, setStep ] = useState(0);
  const [ txHash, setTxHash ] = useState('');
  const userAddress = window.ethereum.selectedAddress;

  const handleChange = (e) => {
    if(e.target.value > 0) {
      const weiTokenAmount = web3.utils.toWei(e.target.value);
      setLockAmount(weiTokenAmount);
    }
  }

  const callLockMethod = async (sig) => {
    try {
      const spender = '0x6687BA38B7fBdfe62FAfB3f30FBA5219C6c6CEAC' // Deposit Contract Address
      const deadline = 1799694895;

      setStep(2);
      const hash = await lockTokens(
        userAddress, 
        spender, 
        lockAmount, 
        deadline, 
        sig
      );
      
      await setTxHash(hash);
      setStep(3);    
    } catch (error) {
      setStep(1);
      console.error(error);
    }
  }

  const lockClicked = async () => {
    const spender = '0x6687BA38B7fBdfe62FAfB3f30FBA5219C6c6CEAC' // Deposit Contract Address
    const deadline = 1799694895;
    const nonce = await getPermitNonce(userAddress);

    if(lockAmount > 0) {
      await signData(
        userAddress,
        spender,
        lockAmount,
        deadline,
        nonce,
        callLockMethod
      );
    }
    else {
      window.alert('Please enter an amount before locking');
    }
  }

  return (
    <div className='main-container'>
      <h3>Lock Up Bleep Tokens</h3>
      <div className='form-container'>
        <img src={lockIcon} height='120' width='auto' alt='lock icon'/>
        <label>Enter an amount</label>
        <input type='number' onChange={(e)=>handleChange(e)}></input>
        <div className='button-container button-width'>
          <Button onClick={returnBack}>Back</Button>
          <Button onClick={lockClicked}>Lock</Button>
        </div>
        <TxStatus 
          step={step} 
          txHash={txHash} 
        />
      </div>
    </div>
  )
}
