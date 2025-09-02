"use client";
import { ThemeSwitcher } from "@/components/ui/shadcn-io/theme-switcher";
import { useAppContext } from "@/context/ThemeWrapper";

const ThemeToggle = () => {
  const { theme, setTheme } = useAppContext();

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
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
