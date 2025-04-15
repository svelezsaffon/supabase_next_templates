"use client";

import { Moon, PaletteIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch"

const ICON_SIZE = 16;

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex w-full px-2 items-center justify-between">
      <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 text-sm outline-none ">
        <PaletteIcon size={ICON_SIZE}/>
        <span>Theme</span>
      </div>
      <div className="flex items-center justify-between gap-2">
          <Moon size={ICON_SIZE}/>
          <Switch 
            checked={theme === 'dark'}
            onCheckedChange={(a)=>{
              setTheme(a?'dark':'light')
          }}/>
          <Sun size={ICON_SIZE}/>
        </div>
    </div>
  );
};

export { ThemeSwitcher };
