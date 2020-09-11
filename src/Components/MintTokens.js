import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { web3, mintTokens } from '../ethHelpers';
import mintIcon from '../images/mint-icon.png';
import TxStatus from '../Components/TxStatus';

export default function MintTokens(props) {
  const { returnBack } = props;
  const [ mintAmount, setMintAmount ] = useState(0);
  const [ step, setStep ] = useState(0);
  const [ txHash, setTxHash ] = useState('');

  const handleChange = (e) => {
    if(e.target.value > 0) {
      const weiTokenAmount = web3.utils.toWei(e.target.value);
      setMintAmount(weiTokenAmount);
    }
  }

  const mintClicked = async () => {
    if(mintAmount > 0) {
      try {
        setStep(2);
        const hash = await mintTokens(mintAmount, userAddress);
        await setTxHash(hash);
        setStep(3);
      } catch (error) {
        setStep(1);
      }
    }
    else {
      window.alert('Please enter an amount before minting');
    }
  }

  const userAddress = window.ethereum.selectedAddress;
  return (
    <div className='main-container'>
      <h3>Mint Bleep Tokens</h3>
      <div className='form-container'>
      <img src={mintIcon} height='95' width='auto' alt='create icon'/>
        <label>Enter an amount</label>
        <input type='number' onChange={(e)=>handleChange(e)}></input>
        <div className='button-container button-width'>
          <Button onClick={returnBack}>Back</Button>
          <Button onClick={mintClicked}>Mint</Button>
        </div>
        <TxStatus 
          step={step} 
          txHash={txHash} 
          />
      </div>
    </div>
  )
}
