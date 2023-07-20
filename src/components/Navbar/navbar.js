import React from 'react';
import ConnectWalletComponent from '../connectWallet';
import './navbar.css';
import logoImage from './Frame 12.png';

const Navbar = ({ onConnectWalletData }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>
      <ConnectWalletComponent onConnectWalletData={onConnectWalletData} />
    </nav>
  );
};

export default Navbar;
