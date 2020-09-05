import React, { useState } from 'react';
import Dashboard from './Components/Dashboard';
import ConnectWallet from './Components/ConnectWallet';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userAddress, setUserAddress ] = useState('0');
  const [ web3, setWeb3 ] = useState({});
  const [ walletConnected, setWalletConnected ] = useState(false);
  const [ tokenContract, setTokenContract ] = useState({});

  return (
    <div className="App">
      <h1>My Killer Dapp</h1>
      {!walletConnected ? 
      <ConnectWallet 
        setWeb3={setWeb3} 
        setWalletConnected={setWalletConnected}
        setUserAddress={setUserAddress}
        setTokenContract={setTokenContract} 
      />
      :
      <Dashboard 
        userAddress={userAddress} 
        web3={web3}
        tokenContract={tokenContract} 
      />
      }
    </div>
  );
}

export default App;
