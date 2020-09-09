import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { web3, mintTokens } from '../Components/ethHelpers';

export default function MintTokens(props) {
  const { returnBack } = props;
  const [ mintAmount, setMintAmount ] = useState(0);
  const [ txSent, setTxSent ] = useState(false);

  const handleChange = (e) => {
    if(e.target.value > 0) {
      const weiTokenAmount = web3.utils.toWei(e.target.value);
      setMintAmount(weiTokenAmount);
      console.log(weiTokenAmount)
    }
  }

  const userAddress = window.ethereum.selectedAddress;

  return (
    <div>
      <h3>Mint Bleep Tokens</h3>
      <label>Enter an amount</label>
      <input type='number' onChange={(e)=>handleChange(e)}></input>
      <Button onClick={returnBack}>Back</Button>
      <Button onClick={()=>mintTokens(mintAmount, userAddress)}>Mint</Button>
      {!txSent ? <div/> : <h4>Transction Sent: View on Etherscan</h4>}
    </div>
  )
}
