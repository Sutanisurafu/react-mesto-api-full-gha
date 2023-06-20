import { useLocation } from "react-router-dom";
import React from "react";
import { NavLink } from "react-router-dom";

function Header({ onExit, profileEmail }) {
  const [headerContainer, setHeaderContainer] = React.useState(<></>);
  const location = useLocation();

  function handleHeaderChange() {
    switch (location.pathname) {
      case "/login":
        setHeaderContainer(
          <NavLink className={"header__nav-link"} to="/register">
            Регистрация
          </NavLink>
        );
        break;
      case "/register":
        setHeaderContainer(
          <NavLink className={"header__nav-link"} to="/login">
            Войти
          </NavLink>
        );
        break;
      case "/main":
        setHeaderContainer(
          <div className="header__container">
            <p className="header__email">{profileEmail}</p>
            <NavLink
              to="/login"
              onClick={onExit}
              className={"header__nav-link"}
            >
              Выйти
            </NavLink>
          </div>
        );
        break;
    }
  }

  React.useEffect(() => {
    handleHeaderChange();
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header__logo" />
      {headerContainer}
    </header>
  );
}

export default Header;
