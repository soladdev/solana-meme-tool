import { useContext } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { HamburgerIcon } from "./icon/hamburger";
import ToggleTheme from "./ToggleTheme";
import WalletButton from "./WalletButton";
import { ThemeContext } from "@/providers/theme";
import { AppContext } from "@/providers/app";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDisclosure } from "@heroui/react";
import { MdMarkEmailUnread } from "react-icons/md";
import { PiTelegramLogoDuotone } from "react-icons/pi";

export default function Header() {
  const { sideToggle, setSideToggle } = useContext(AppContext);

  const getPageTitle = () => {
    const router = useRouter();
    switch (router.pathname) {
      case "/":
        return "Token Launch on Pump.fun";
      case "/launch": 
        return "Token Launch on Pump.fun"
      case "/copy-trade":
        return "Copy Trading";
      case "/sniper":
        return "Snipping on Raydium";
      case "/bundle-buy":
        return "Bundle Buy"
      case "/limit-order":
        return "Limit Order";
      case "/trenches":
        return "Trenches";
      case "/volume-boost":
        return "Volume Booster on Pump.fun"
      case "/control":
        return "Token Detail";
      case "/wallet-check":
        return "Wallet Risk Score Prediction"
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex justify-between items-center border-header bg-background px-7 border-b w-full h-[80px] lg:h-[120px]">
      <div className="flex items-center gap-2">
        <div className="md:hidden" onClick={() => setSideToggle(!sideToggle)}>
          <HamburgerIcon className="text-text" />
        </div>
        <span className="sm:block hidden font-bold text-[24px] text-text xl:text-[24px] 2xl:text-[24px]">
          {getPageTitle()}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={`https://x.com/vladmeer67`}
          target="_blank"
          className="mr-2 p-1 h-full aspect-square"
        >
          <BsTwitterX className={`${sideToggle ? "#fff" : "#000"}`} size={24} />
        </Link>
        <Link
          href={`https://t.me/vladmeer67`}
          target="_blank"
          className="mr-2 p-1 h-full aspect-square"
        >
          <PiTelegramLogoDuotone className={`${sideToggle ? "#fff" : "#000"}`} size={28} />
        </Link>
        <ToggleTheme />
        <button className="rounded-lg border-[0.75px] border-primary bg-theme text-text shadow-btn-inner text-primary-100 tracking-[0.32px] py-2 px-5 group relative">
          <div
            className={`hidden sm:flex items-center justify-center gap-1 text-[12px] lg:text-[16px] text-white `}
            onClick={onOpen}
          >
            Sign up for AI tools
          </div>
          <div
            className={`flex sm:hidden items-center justify-center gap-1 text-[12px] lg:text-[16px] text-white `}
            onClick={onOpen}
          >
            <MdMarkEmailUnread className=" text-white text-[18px]"/>
          </div>
        </button>
        <WalletButton />
      </div>
    </div>
  );
}
