"use client";
import { ThemeSwitcher } from "@/components/ui/shadcn-io/theme-switcher";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("data-theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark" ||
          (savedTheme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("data-theme", newTheme);
    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark" ||
        (newTheme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  };

  return (
    <ThemeSwitcher
      defaultValue="system"
      onChange={handleThemeChange}
      value={theme}
    />
  );
};

export default ThemeToggle;
