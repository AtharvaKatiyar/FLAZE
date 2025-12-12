import {Link, NavLink } from "react-router-dom"; // or "next/link" if using Next.js
import { useState } from "react";
import { useEffect } from 'react';
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from '../client/thirdwebClient';
import { useNavigate } from 'react-router';
import wallets from "../client/createWallet";
export default function Sidebar() {

  const account = useActiveAccount();
    console.log("connected to", account?.address);
    const navigate = useNavigate();
    useEffect(() => {
      if (!account) {
        navigate("/");
      }
    }, [account, navigate]);

  const [active, setActive] = useState(null);

  const navItems = [
    { name: "AI Generator", path: "/dashboard/ai-generator" },
    { name: "Images", path: "/dashboard//images" },
    { name: "Minted", path: "/dashboard//minted" },
    { name: "Collections", path: "/dashboard//collections" },
    { name: "History", path: "/dashboard//history" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-white flex flex-col justify-between">
      <div className="flex items-center p-6">
        <Link to="/" className="text-white text-bold custom-font text-2xl">FLAZE</Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            onClick={() => setActive(item.name)}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive || active === item.name
                  ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/50"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-6 border-t mx-auto border-white">
        <ConnectButton
          client={client}
          connectButton={{ label: "Connect Wallet" }}
          connectModal={{
            showThirdwebBranding: false,
            size: "compact",
            title: "Connect Wallet",
          }}
          wallets={wallets}
        />
      </div>
    </div>
  );
}
