
//allows use of React state in funciton components
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Button from 'react-bootstrap/Button'

//Imports EtherWallet.sol ABI (Application-Binary Interface)
import EtherWallet from "./artifacts/contracts/EtherWallet.sol/EtherWallet.json"
import './App.css';

function App() {

  const etherWalletAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


  //State for MetaMask Account
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [shouldDisable, setShouldDisable] = useState(false) //state of 'connect to MetaMask' button
  

  //State for EtherWallet.sol Smart Contract
  const [scBalance, setSCBalance] = useState(0);
  const [ethToUseForDepost, setEthToUseForDeposit] = useState(0)

  useEffect(() => {
    //obtain balance of smart contract
    async function getEtherWalletBalance() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          contractAddress,
          EtherWaller.abi,
          provider
        )
        let balance = await contract.balanceOf()
        
        //converts balance from wei to eth
        balance = ethers.utils.formatEther(balance)
        setSCBalance(balance)
      } catch (err) {
        console.log("getEtherWalletBalance() exited with error: ", err)
      }
    }
    getEtherWalletBalance() //triggers every refresh
  }, [])

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
      console.log("connectToMetamask() exited with error: ", err)
    }
  }

  const disconnectFromMetamask = async => {
    console.log("Disconnecting wallet from MetaMask...")
    try {
      setAccount('') //removes our account from the account state
      setBalance(0)
      setIsActive(false)
    } catch (err) {
      console.log("disconnectFromMetamask() exited with error: ", err)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {!isActive ? (                   //if MetaMask connection IS NOT active
          <>
            <Button variant="secondary" onClick={connectToMetamask} disabled={shouldDisable}>
              <img src="images/metamask.svg" alt="metamask" width="50" height ="50" />
              <span class="left-padding-sm">Connect</span>
            </Button>
            
          </>
        ) : (                            //if MetaMask connection IS active
          <>
            <Button variant="danger" onClick={disconnectFromMetamask}>
              Disconnect Metamask{' '}
              <img src="images/hand.svg" alt="disconnect" width="50" height="50" />
            </Button>
            <div className='mt-2 mb-2'>Connected Account: {account}</div>
            <div className='mt-2 mb-2'>Balance: {balance}</div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
