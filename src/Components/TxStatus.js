import React from 'react';
import ReactLoading from "react-loading";

export default function TxStatus(props) {
  const { step, txHash } = props;
 
  switch (step) {
    case 1:
      return(<div />);
    case 2:
      return(
        <div>
          <ReactLoading type="balls" width={'180px'} color="#1469d9" />
          <br/>
          <br/>
          <br/>
          <h5>Transaction in Progress</h5>
        </div>
      );
    case 3: 
      return(<a target='_blank'rel="noopener noreferrer" href={`https://kovan.etherscan.io/tx/${txHash}`}>View Tx on Etherscan</a>)
    default:
      break;
  }
  return (
    <div>
      
    </div>
  )
}
