import './App.css';
import contractABI from './utils/abi.json';
import React, {useState, useEffect} from 'react';

function App() {
  //WEB3 methods
  const address = "0x4A4d9dD95DDb359EaBbc4fb64Ba10cf29BDC895e";
  const abi = contractABI.abi;
  const ethereum = window.ethereum;
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (hasWeb3) {
      findAccount()
    }
  })

  const hasWeb3 = () => {
    return Boolean(ethereum);
  }

  const findAccount = async () => {
    const accounts = await ethereum.request({method: "eth_accounts"});
    setAccount(accounts[0]);
  }

  const connectWallet = async () => {
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    setAccount(accounts[0]);
  }

  //




  return (
    <>
      {!account &&
      <button onClick={connectWallet}>
        Connect Wallet
      </button>
      }
    </>
  );
}

export default App;
