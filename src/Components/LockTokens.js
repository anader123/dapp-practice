import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { 
  signData, 
  getPermitNonce, 
  lockTokens, 
  web3 
} from '../Components/ethHelpers';
import lockIcon from '../images/lock-icon.png';

export default function LockTokens(props) {
  const { returnBack } = props;
  const [ lockAmount, setLockAmount ] = useState(0);
  const [ txSent, setTxSent ] = useState(false);
  const [ txHash, setTxHash ] = useState('');
  const userAddress = window.ethereum.selectedAddress;

  const handleChange = (e) => {
    if(e.target.value > 0) {
      const weiTokenAmount = web3.utils.toWei(e.target.value);
      setLockAmount(weiTokenAmount);
    }
  }

  const callLockMethod = async (sig) => {
    const spender = '0x6687BA38B7fBdfe62FAfB3f30FBA5219C6c6CEAC' // Deposit Contract Address
    const deadline = 1799694895;
    const nonce = await getPermitNonce(userAddress);

    const hash = await lockTokens(
      userAddress, 
      spender, 
      lockAmount, 
      deadline, 
      sig
      );
  
      setTxHash(hash);
      setTxSent(true);
  }

  const lockClicked = async () => {
    const spender = '0x6687BA38B7fBdfe62FAfB3f30FBA5219C6c6CEAC' // Deposit Contract Address
    const deadline = 1799694895;
    const nonce = await getPermitNonce(userAddress);

    await signData(
      userAddress,
      spender,
      lockAmount,
      deadline,
      nonce,
      callLockMethod
    );
  }

  return (
    <div className='main-container'>
      <h3>Lock Up Bleep Tokens</h3>
      <div className='form-container'>
        <img src={lockIcon} height='150' width='auto'/>
        <label>Enter an amount</label>
        <input type='number' onChange={(e)=>handleChange(e)}></input>
        <div className='button-container'>
          <Button onClick={returnBack}>Back</Button>
          <Button onClick={lockClicked}>Lock</Button>
        </div>
        {!txSent ? <div/> : <a target='_blank'rel="noopener noreferrer" href={`https://kovan.etherscan.io/tx/${txHash}`}>View Tx on Etherscan</a>}
      </div>
    </div>
  )
}
