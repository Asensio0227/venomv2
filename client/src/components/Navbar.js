import { FaBars} from "react-icons/fa";
import { useGlobalContext } from "../context/context";
import {Link} from "react-router-dom"
import { useEffect,useState } from "react";

const getLocalStorageTheme = () => {
  let theme = 'light-theme';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }
  return theme;
}

const Navbar = () => {
  const { users, toggleSidebar } = useGlobalContext();
  const [theme, setTheme] = useState(getLocalStorageTheme());

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  }

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
            <Link to="/">{users.name}</Link>
          <button className="nav-btn btn" onClick={toggleSidebar}>
            <FaBars/>
          </button>
          <button className="nav-toggle btn" onClick={toggleTheme}>
            toggle theme
          </button>
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar