import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { ArrowLine, ExitIcon, WalletIcon } from "./SvgIcon";

const WalletButton: FC = () => {
  const { setVisible } = useWalletModal();
  const { publicKey, disconnect } = useWallet();
  return (
    <button className="rounded-lg border-[0.75px] border-primary bg-theme text-text shadow-btn-inner text-primary-100 tracking-[0.32px] py-2 px-2 w-[100px] lg:w-[180px] group relative">
      {publicKey ? (
        <>
          <div className="flex items-center justify-center text-[12px] lg:text-[16px] text-white">
            {publicKey.toBase58().slice(0, 4)}....
            {publicKey.toBase58().slice(-4)}
            <div className="rotate-90 w-3 h-3">
              <ArrowLine />
            </div>
          </div>
          <div className="w-[140px] lg:w-[180px] absolute left-0 top-[34px] hidden group-hover:block">
            <ul className="border-[0.75px] border-[#89C7B5] rounded-lg bg-[#162923] p-2 mt-2 flex flex-col gap-2">
              <li>
                <button
                  className="flex gap-2 items-center text-primary-100 tracking-[-0.32px]"
                  onClick={() => setVisible(true)}
                >
                  <WalletIcon /> Change Wallet
                </button>
              </li>
              <li>
                <button
                  className="flex gap-2 items-center text-primary-100 tracking-[-0.32px]"
                  onClick={disconnect}
                >
                  <ExitIcon /> Disconnect
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div
          className="flex items-center justify-center gap-1 text-[12px] lg:text-[16px]"
          onClick={() => setVisible(true)}
        >
          Connect wallet <ArrowLine />
        </div>
      )}
      {/* <div className=""></div> */}
    </button>
  );
};

export default WalletButton;