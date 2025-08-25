"use client";
import { ThemeSwitcher } from "@/components/ui/shadcn-io/theme-switcher";
import { useAppContext } from "@/context/ThemeWrapper";

const ThemeToggle = () => {
  const { theme, setTheme } = useAppContext();

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
