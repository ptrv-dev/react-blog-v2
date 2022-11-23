import React from 'react';
import { Link } from 'react-router-dom';

import Search from '../Search';
import Button from '../UI/Button';

import style from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link to="/" className={style.logo}>
          <img src="./assets/img/logo.svg" alt="likbezz logo" />
        </Link>
        <Search />
        <div className={style.actions}>
          <Button>Войти</Button>
          <Button variant="text">Создать аккаунт</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
