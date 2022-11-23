import React from 'react';

import Button from '../../components/UI/Button';

import style from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <main className={style.root}>
      <div className={style.container}>
        <form className={style.login}>
          <h2>Мы скучали!</h2>
          <p>Выполните вход, что-бы продолжить...</p>
          <div className={style.fields}>
            <label htmlFor="email" className={style.label}>
              Ваш E-Mail адрес:
            </label>
            <div
              className={style.inputWrapper}
              onClick={() => emailInputRef.current?.focus()}
            >
              <img src="/assets/img/icons/email-icon.svg" alt="Email" />
              <input
                type="text"
                placeholder="example@email.com"
                id="email"
                ref={emailInputRef}
              />
            </div>

            <label htmlFor="password" className={style.label}>
              Пароль:
            </label>
            <div
              className={style.inputWrapper}
              onClick={() => passwordInputRef.current?.focus()}
            >
              <img src="/assets/img/icons/password-icon.svg" alt="Password" />
              <input
                type="password"
                placeholder="********"
                id="password"
                ref={passwordInputRef}
              />
            </div>
            <div className={style.bottom}>
              <div className={style.checkWrapper}>
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Запомнить меня</label>
              </div>
              <Button size="small" variant="text" className={style.button}>
                Забыли пароль?
              </Button>
            </div>
          </div>
          <Button>Войти</Button>
        </form>
        <img
          src="/assets/img/auth/image.jpg"
          className={style.image}
          alt=""
        ></img>
      </div>
    </main>
  );
};

export default LoginPage;
