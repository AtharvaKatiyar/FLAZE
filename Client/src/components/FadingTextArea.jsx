import React, { useState, useRef, useEffect } from "react";
import { useConnectModal } from "thirdweb/react";
import { client } from "../client/thirdwebClient";
import {sepolia} from 'thirdweb/chains'
import wallets from "../client/createWallet";
const FadingTextarea = ({
  placeholder = "What do you want to create today?",
  className = "",
  ...props
}) => {
  const textareaRef = useRef(null);
  const [showFade, setShowFade] = useState(false);

  // Detect overflow
  const checkOverflow = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const isOverflowing = textarea.scrollHeight > textarea.clientHeight;
      const isScrolledToBottom =
        textarea.scrollTop + textarea.clientHeight >= textarea.scrollHeight - 1;

      // Show fade only if overflowing and not scrolled fully
      setShowFade(isOverflowing && !isScrolledToBottom);
    }
  };

  useEffect(() => {
    checkOverflow();
    const handleResize = () => checkOverflow();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = () => checkOverflow();
  const {connect} = useConnectModal()
  const handleConnect = async () => {
    try {
      await connect({
          client: client,
          chain: sepolia, 
          connectModal: {
            showThirdwebBranding: false,
            size: "compact",
            title: "Connect Wallet",
          },
          wallets
        });
      console.log("Wallet connected!");
    } catch (err) {
      console.error("Failed to open connect modal:", err);
    }
  };


  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-1/2 z-50">
      <div className=" bg-gradient-to-b from-[#292b33] to-transparent h-70 border-t-1 border-l-1 border-r-1 border-white/40 rounded-t-4xl flex shadow-[0px_0px_60px_0px_rgba(255,255,255,0.35)] w-full">
        <textarea
          ref={textareaRef}
          onScroll={handleScroll}
          onInput={checkOverflow}
          placeholder={placeholder}
          className={`placeholder-light-4 w-full resize-none bg-transparent p-6 pb-0 text-white outline-none scrollbar-thin scrollbar-thumb-dark-4 scrollbar-track-transparent whitespace-pre-line h-36 ${className}`}
          {...props}
        ></textarea>
        <div>
          <button onClick={handleConnect} className="inline-flex items-center justify-center rounded-full font-semibold transition-colors cursor-pointer animation-wrapper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-sm gap-1.5 aspect-square size-9 px-0 hover:text-white text-dark-2 bg-[#333540] -translate-x-[20px] translate-y-[20px]" aria-disabled="true" aria-busy="false" disabled="">
            <svg className="size-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0007 2.33203C10.2569 2.33175 10.5131 2.4293 10.7086 2.62468L15.7088 7.62134C16.0995 8.01172 16.0997 8.64489 15.7093 9.03555C15.3189 9.42621 14.6858 9.42643 14.2951 9.03605L10.9991 5.74237L10.9991 16.6665C10.9991 17.2188 10.5514 17.6665 9.99911 17.6665C9.44682 17.6665 8.99911 17.2188 8.99911 16.6665L8.9991 5.74784L5.70884 9.03602C5.31819 9.42642 4.68502 9.42622 4.29462 9.03557C3.90422 8.64493 3.90442 8.01176 4.29507 7.62136L9.24986 2.66972C9.43308 2.46261 9.70084 2.33203 9.9991 2.33203L10.0007 2.33203Z" fill="currentColor"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FadingTextarea;
