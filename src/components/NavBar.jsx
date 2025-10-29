import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { MdSunny } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const NavBar = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="sticky top-0 shadow-md z-[9999] p-2 px-4 md:px-8 lg:px-12 backdrop-blur-lg bg-transparent">
      <div className="flex items-center justify-between gap-6">
        <NavLink
            to="/" >
          <div className="flex gap-2">
            <img src="https://png.pngtree.com/png-clipart/20220213/original/pngtree-papercut-white-cloud-icon-png-image_7266753.png" width="46" height="46"/>
            <h2 className="text-[24px] mt-2 font-bold">SkyCast</h2>
          </div>
        </NavLink>
        <nav className="flex justify-end text-right gap-4 md:gap-4 lg:gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-black-400 font-semibold" : "hover:text-grey-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/forecast"
            className={({ isActive }) =>
              isActive ? "text-black-400 font-semibold" : "hover:text-grey-300"
            }
          >
            Forecast
          </NavLink>
          <div className="mt-[2px]">
            { theme == 'light' ? 
                <MdDarkMode className="cursor-pointer" onClick={() => toggleTheme()} />
                : 
                <MdSunny className="cursor-pointer" onClick={() => toggleTheme()} />
            }
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
