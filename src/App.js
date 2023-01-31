//allows use of React state in funciton components
import { useState } from 'react';

import { ethers } from 'ethers';
import Button from 'react-bootstrap/Button'
import './App.css';

function App() {

  //State for MetaMask Account
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [shouldDisable, setShouldDisable] = useState(false) //state of 'connect to MetaMask' button
  
  //Connect to MetaMask Wallet
  const connectToMetamask = async() => {
    console.log("Connecting to MetaMask...");
    setShouldDisable(true) //disables 'connect to MetaMask' button
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      //asks the user for permission to connect MetaMask to user accounts
      await provider.send('eth_requestAccounts', [])

      const signer = provider.getSigner()
      const account = await signer.getAddress()
      let balance = await signer.getBalance()

      balance = ethers.utils.formatEther(balance)
      setAccount(account)
      setBalance(balance)
      setIsActive(true)
      setShouldDisable(false)
    } catch (err) {
      console.log("connectToMetamask exited with error: ", err)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="secondary" onClick={connectToMetamask} disabled={shouldDisable}>
          <img src="images/metamask.svg" alt="metamask" width="50" height ="50" />
        </Button>
        <div className='mt-2 mb-2'>Connected Account:</div>
        <Button variant="danger">
          Disconnect Metamask{' '}
          <img src="images/hand.svg" alt="disconnect" width="50" height="50" />
        </Button>
      </header>
    </div>
  );
}

export default App;
