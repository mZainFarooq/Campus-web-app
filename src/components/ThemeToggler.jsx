import { IoSunnyOutline } from "react-icons/io5";
import useTheme from "../hooks/useTheme";
import { LuSunMoon } from "react-icons/lu";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      id="themeToggle"
      className="flex  cursor-pointer items-center gap-2 p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow hover:shadow-lg transition"
    >
      {theme === "dark" ? (
        <LuSunMoon size={20} />
      ) : (
        <IoSunnyOutline size={20} />
      )}
    </button>
  );
};

export default ThemeToggler;
