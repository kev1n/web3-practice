import './App.css';
import contractABI from './utils/abi.json';
import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';
function App() {
  //WEB3 methods
  const contractAddress = "0x4A4d9dD95DDb359EaBbc4fb64Ba10cf29BDC895e";
  const abi = contractABI.abi;
  const ethereum = window.ethereum;
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (hasWeb3) {
      findAccount();
      
    } else {
      alert("Install metamask!!")
    }
  })

  useEffect(() => {
    getAliasList();
  }, [])

  const hasWeb3 = () => {
    return Boolean(ethereum);
  }

  const findAccount = async () => {
    const accounts = await ethereum.request({method: "eth_accounts"});
    setAddress(accounts[0]);

  }

  const connectWallet = async () => {
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    setAddress(accounts[0]);
  }

  //Contract interactions
  const getAddressArray = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    
    const response = await contract.getAddressArray(address);
    return response
  }

  const getAlias = async (props) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    
    const response = await contract.getAlias(props.address);
    return response
  }

  const addAddress = async (props) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    
    const response = await contract.addAddress(props.toAddress, props.alias);
  }

  const removeAddress = async (props) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    
    const response = await contract.removeAddress(props.toAddress);
  }

  //HTML
  const AddingForm = () => {
    const [alias, setAlias] = useState("");
    const [toAddress, setToAddress] = useState("");

    const handleAliasChange = (event) => {
      setAlias(event.target.value);
    }

    const handleAddressChange = (event) => {
      setToAddress(event.target.value);
    }

    return (
      <>
        <form>
          <label>Change </label>
          <input onChange={handleAddressChange}></input>
          <label>'s alias to </label>
          <input onChange={handleAliasChange}></input>
        </form>
        <button onClick={() => addAddress({
          toAddress: toAddress,
          alias: alias
        })}>
          Submit
        </button>
      </>
    )
  }

  const RemovingForm = () => {
    const [toAddress, setToAddress] = useState("");
    const handleAddressChange = (event) => {
      setToAddress(event.target.value);
    }
    return (
      <>
        <form>
          <label>Remove </label>
          <input onChange={handleAddressChange}></input>
          <label>'s alias</label>
        </form>
        <button onClick={() => removeAddress({
          toAddress: toAddress,
        })}>
          Submit
        </button>
      </>
    )
  }

  const [addressList, setAddressList] = useState([]);
  const [aliasList, setAliasList] = useState([]);
  const cleanAddresses = async () => {
    let aliasRequests = [];
    getAddressArray().then((resp) => {
      setAddressList(resp);
      for (let i = 0; i < resp; i++) {
        aliasRequests.push(getAlias(resp[i]));
      }
    })
    return Promise.all(aliasRequests);
  }

  const getAliasList = async () => {
    cleanAddresses().then((resp) => {
      console.log(resp);
      setAliasList(resp);
    })
  }

  return (
    <>
      {!address &&
      <button onClick={connectWallet}>
        Connect Wallet
      </button>
      }

      {address &&
      <>
        <AddingForm/>
        <br/>
        <RemovingForm/>
        <br/>
        <button onClick={() => getAliasList()}></button>
        <button onClick={() => console.log(aliasList)}></button>
      </>
      }
    </>
  );
}

export default App;
