import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [burnAmount, setBurnAmount] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account[0]);
    } else {
      console.log("No account found");
    }
  }

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  }

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  const burn = async (amount) => {
    if (atm) {
      let tx = await atm.burn(ethers.utils.parseUnits(amount, 'ether'));
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    if (!account) {
      return <button onClick={connectAccount} className="btn">Please connect your Metamask wallet</button>
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div className="user-details">
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <div className="buttons">
          <button onClick={deposit} className="btn">Deposit 1 ETH</button>
          <button onClick={withdraw} className="btn">Withdraw 1 ETH</button>
        </div>

        <div className="burn-section">
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Amount to burn"
            value={burnAmount}
            onChange={(e) => setBurnAmount(e.target.value)}
            className="input"
          />
          <button onClick={() => burn(burnAmount)} className="btn">Burn</button>
        </div>
      </div>
    )
  }

  useEffect(() => { getWallet(); }, []);

  return (
    <div className="main-container">
      <main className="container">
        <header><h1>WELCOME TO JIGSAWPUZZLE'S ATM!</h1></header>
        {initUser()}
      </main>
      <style jsx>{`
        .main-container {
          background-color: mintcream;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        header h1 {
          color: #2c3e50;
          font-family: 'Arial', sans-serif;
        }
        .user-details {
          margin-top: 20px;
        }
        .buttons {
          margin: 10px 0;
        }
        .btn {
          background-color: #3498db;
          color: white;
          padding: 10px 20px;
          margin: 5px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .btn:hover {
          background-color: #2980b9;
        }
        .burn-section {
          margin-top: 20px;
        }
        .input {
          padding: 10px;
          margin-right: 10px;
          border-radius: 5px;
          border: 1px solid #bdc3c7;
        }
      `}
      </style>
    </div>
  )
}
