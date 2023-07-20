import React, { useState } from "react";
import Uploadfile from "./components/uploadfile";
import Display from "./components/Display";
import Navbar from "./components/Navbar/navbar";
import "./App.css";
import Modal from "./components/modal";
import RevokeModel from "./components/revokeModel";

function App() {
  const [Contract, setContract] = useState(null);
  const [Account, setAccount] = useState("");
  const [Provider, setProvider] = useState(null);
  const [modalOpen, setModelOpen] = useState(false);
  const [modalRevoke, setmodalRevoke] = useState(false);
  const [display, setDisplay] = useState(false);

  const handleConnectWalletData = (contract, account, provider) => {
    setContract(contract);
    setAccount(account);
    setProvider(provider);
  };

  const shouldDisplayUpload = Contract && Account && Provider && !display && !modalOpen && !modalRevoke;

  return (
    <>
      <Navbar onConnectWalletData={handleConnectWalletData} />
      <div className="App">
        <h1 className="heading">Send Super Big File</h1>
        <p className="subheading">Simple . Fast . Secure</p>

        <div className="content-container">
          {shouldDisplayUpload && (
            <Uploadfile
              Contract={Contract}
              Provider={Provider}
              Account={Account}
            />
          )}
        </div>
        {display && (
          <Display
            Contract={Contract}
            setDisplay={setDisplay}
            Account={Account}
          />
        )}

        {modalOpen && (
          <Modal setModelOpen={setModelOpen} Contract={Contract}></Modal>
        )}

        {modalRevoke && (
          <RevokeModel
            setmodalRevoke={setmodalRevoke}
            Contract={Contract}
          ></RevokeModel>
        )}

        <div className="button-container">
          <button 
            className={`action-button ${display ? "active" : ""}`} 
            onClick={() => {
              setDisplay(!display);
              setModelOpen(false);
              setmodalRevoke(false);
            }}
          >
            Display
          </button>

          {!modalOpen && (
            <button
              className="action-button"
              onClick={() => {
                setModelOpen(true);
                setDisplay(false);
                setmodalRevoke(false);
              }}
            >
              Share
            </button>
          )}

          {!modalRevoke && (
            <button
              className="action-button"
              onClick={() => {
                setmodalRevoke(true);
                setDisplay(false);
                setModelOpen(false);
              }}
            >
              Revoke
            </button>
          )}
        </div>

       
      </div>
    </>
  );
}

export default App;
