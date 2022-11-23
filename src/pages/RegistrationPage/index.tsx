import React from 'react';

import Button from '../../components/UI/Button';

import style from './RegistrationPage.module.scss';

const LoginPage: React.FC = () => {
  const usernameInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const passwordRepeatInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <main className={style.root}>
      <div className={style.container}>
        <img
          src="/assets/img/auth/image.jpg"
          className={style.image}
          alt=""
        ></img>
        <form className={style.login}>
          <h2>Создать аккаунт</h2>
          <div className={style.fields}>
            <label htmlFor="username" className={style.label}>
              Имя пользователя:
            </label>
            <div
              className={style.inputWrapper}
              onClick={() => usernameInputRef.current?.focus()}
            >
              <img src="/assets/img/icons/username-icon.svg" alt="Email" />
              <input
                type="text"
                placeholder="username"
                id="username"
                ref={usernameInputRef}
              />
            </div>

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
            <label htmlFor="passwordRepeat" className={style.label}>
              Повторите пароль:
            </label>
            <div
              className={style.inputWrapper}
              onClick={() => passwordRepeatInputRef.current?.focus()}
            >
              <img src="/assets/img/icons/password-icon.svg" alt="Password" />
              <input
                type="password"
                placeholder="********"
                id="passwordRepeat"
                ref={passwordRepeatInputRef}
              />
            </div>
          </div>
          <Button>Создать аккаунт</Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
