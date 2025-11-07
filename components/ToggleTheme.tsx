import { Switch } from "@heroui/react";
import { SunIcon } from "./icon/sun";
import { MoonIcon } from "./icon/moon";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/providers/theme";

export default function ToggleTheme() {

  const { theme, toggleTheme } = useContext(ThemeContext)

  const [currenttheme, setTheme] = useState(theme)

  useEffect(() => {

  }, [theme])
  return (
    <Switch
      isSelected={theme === "dark"} onValueChange={toggleTheme}
      size="lg"
      color="default"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    >
      {/* <p className="hidden sm:block">Dark mode</p> */}
    </Switch>
  );
}