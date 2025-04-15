"use client";

import { Button } from "@/components/ui/button";
import { Laptop, Moon, PaletteIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch"

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

  const ICON_SIZE = 16;

  return (
    <div className="flex w-full px-2 items-center justify-between">
      <PaletteIcon size={ICON_SIZE}/>
      <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm p-2 text-sm">
          <Switch checkedIcon={<Moon/>} uncheckedIcon={<Sun/>} onCheckedChange={(a)=>{
            if(a){
              setTheme('dark')
            }else{
              setTheme('light')
            }
          }}/>
        </div>
    </div>
  );
};

export { ThemeSwitcher };
