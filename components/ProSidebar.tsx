import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  MenuItemStyles,
  menuClasses,
} from "react-pro-sidebar";
import { BsTwitterX } from "react-icons/bs";
import { IoBarChart } from "react-icons/io5";
import { FaRegCopy, FaGoogleWallet } from "react-icons/fa6";
import { GrBundle } from "react-icons/gr";
import { FaMapMarkerAlt } from "react-icons/fa";
import { SiMailgun, SiBoost } from "react-icons/si";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineRocketLaunch } from "react-icons/md";

import { useRouter as useNextRouter } from "next/router";
import { useRouter as useLoaderRouter } from "nextjs-toploader/app";
import { GiMedicines } from "react-icons/gi";
import { useContext, useState } from "react";
import { AppContext, useAppContext } from "@/providers/app";
import { Image } from "@heroui/react";
import Link from "next/link";

type Theme = "light" | "dark";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "hsl(197 92% 56%)",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "hsl(var(--accent))",
        color: "hsl(var(--accent))",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

export default function ProSidebar() {
  const route = useLoaderRouter();
  const nextRouter = useNextRouter();
  // const [toggled, setToggled] = useState(false);
  const { collapsed, setCollapsed } = useAppContext();
  const [rtl, setRtl] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  const { sideToggle, setSideToggle } = useContext(AppContext);

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "var(--color-text)",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? `var(--background-100)` : "var(--background-200)",
    }),
    button: {
      borderRadius: "8px",
      background: "",
      borderLeft: "4px solid transparent",
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: `var(--background-200)`,
        color: themes[theme].menu.hover.color,
      },
      "&:hover svg": {
        backgroundColor: `var(--background-200)`,
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }: { open?: boolean }) => ({
      display: collapsed && !open ? "none" : "block",
      fontWeight: open ? 600 : undefined,
    }),
  };

  // Private code
}
