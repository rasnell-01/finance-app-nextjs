'use client'

import {useState, useEffect} from "react";
import useDarkMode from "@/hooks/use-dark-mode";
import Button from "./button";
import {Moon, Sun} from "lucide-react";

export default function DarkModeToggle({defaultMode = 'dark'}) {
  const {theme, toggleTheme} = useDarkMode(defaultMode)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <Button variant="ghost" size="sm" onClick={toggleTheme}>
    {theme === 'light' && <Moon className="w-4 h-4" />}
    {theme === 'dark' && <Sun className="w-4 h-4" />}
  </Button>
}
