import logoSvg from "../assets/favicon-32x32.png"
import logoPNG from "../assets/images/favicon-32x32.png"

const Logo = () => {
  const getLocalStorageTheme = () => {
    let theme = 'dark-theme';
    if (localStorage.getItem('theme')) {
      theme = localStorage.getItem('theme');
    }
    return theme;
  };
  const themes = getLocalStorageTheme();
  return (
        <>
      {themes !== "dark-theme" ? <img src={logoPNG} alt="trends" className="logo" /> : <img src={ logoSvg } alt="trends" className="logo" />}
        </>
  )
}

export default Logo