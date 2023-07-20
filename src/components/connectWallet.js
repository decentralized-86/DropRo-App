import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../contractDetails/Storage.json";
import './connectWallet.css'

export default function ConnectWalletComponent({ onConnectWalletData }) {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        if (provider) {
          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          const accounts = await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          setConnected(accounts.length > 0);

          const contractAddress = "0xe54df84B404d4B1b2aa60612cB3ED5d698672Ca9";
          const storage = new ethers.Contract(contractAddress, abi.abi, signer);
          setContract(storage);
          onConnectWalletData(storage, address, provider);
        } else {
          console.error("Metamask not installed.");
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };

    loadProvider();
  }, []);

  const handleConnectWallet = async () => {
    if (provider) {
      await provider.send("eth_requestAccounts", []);
    }
  };

  return (
    <div>
      <button className="connect-wallet-button" onClick={handleConnectWallet}>
        {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Connect Wallet'}
      </button>
    </div>
  );
}
