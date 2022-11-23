import React from 'react';
import { Link } from 'react-router-dom';

import style from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={style.footer}>
      <div className={style.container}>
        <div className={style.top}>
          <Link to="/" className={style.logo}>
            <img src="/assets/img/logo.svg" alt="likbezz logo" />
          </Link>
          <div className={style.column}>
            <nav>
              <Link to="/">Главная</Link>
              <Link to="/">Популярное за сегодня</Link>
              <Link to="/">Последнее</Link>
              <Link to="/">Контакты</Link>
              <Link to="/">О нас</Link>
            </nav>
            <nav>
              <Link to="/">Войти</Link>
              <Link to="/">Создать аккаунт</Link>
              <Link to="/">Тех. поддержка</Link>
            </nav>
          </div>
        </div>
        <div className={style.bottom}>
          <p>
            © 2022 “likbezz” • All Rights Reserved. <br />
            Made by ptrv-dev
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
