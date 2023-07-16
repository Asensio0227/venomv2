// import logoSvg from "../assets/images/logo.svg"
// import logoPNG from "../assets/images/logo.png"

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
      {/* {themes !== "light-theme" ? <img src ="hello" alt = "trends" className = "logo" /> : <img src = { logoPNG } alt = "trends" className = "logo" />} */}
      <img src ="hello" alt = "trends" className = "logo" />
        </>
  )
}

export default Logo