import React, { useEffect } from "react";
import { NavLink, Link } from "react-router";
import '../assets/font.css'
import { ConnectButton, useActiveAccount, useChainMetadata } from "thirdweb/react";
import { client } from "../client/thirdwebClient";
import wallets from "../client/createWallet";
import { useNavigate } from "react-router-dom";
import { sepolia } from "thirdweb/chains";


const Navbar = () => {
  const account = useActiveAccount();
  console.log("connected to", account?.address);
  const chain = useChainMetadata();
  console.log('Connected to chain: ',chain?.name);
  const navigate = useNavigate();
  useEffect(()=>{
    if(account){
      navigate("/dashboard");
    }
  },[account, navigate]);
  return (
    <nav className="fixed top-0 left-0 right-0 md:px-50 sm:px-10 z-100 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-white text-bold custom-font text-2xl">FLAZE</Link>
      </div>

      {/* Get Started Free Button */}
      <div>
        <ConnectButton
          client={client}
          chain={sepolia}
          connectButton={{ label: "Connect Wallet" }}
          connectModal={{
            showThirdwebBranding: false,
            size: "compact",
            title: "Connect Wallet",
          }}
          wallets={wallets}
        />
      </div>

    </nav>
  );
};

export default Navbar;