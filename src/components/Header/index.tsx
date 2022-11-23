import React from 'react';
import { Link } from 'react-router-dom';

import Search from '../Search';
import Button from '../UI/Button';

import style from './Header.module.scss';

const Header: React.FC = () => {
  const [width, setWidth] = React.useState(0);
  const [isMenuActive, setIsMenuActive] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link to="/" className={style.logo}>
          <img src="./assets/img/logo.svg" alt="likbezz logo" />
        </Link>
        {width > 550 && <Search />}
        {width > 768 ? (
          <div className={style.actions}>
            <Button>Войти</Button>
            <Button variant="text">Создать аккаунт</Button>
          </div>
        ) : (
          isMenuActive && (
            <div className={style.menu}>
              {width <= 550 && <Search />}
              <Button>Войти</Button>
              <Button variant="text">Создать аккаунт</Button>
            </div>
          )
        )}

        {width <= 768 && (
          <button
            className={`${style.menuToggle} ${
              isMenuActive ? style.active : ''
            }`}
            onClick={() => setIsMenuActive((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
