"use client";

import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { BsSunFill } from "react-icons/bs";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <MdDarkMode size={30}/> : <BsSunFill size={30} />}</button>;
}
