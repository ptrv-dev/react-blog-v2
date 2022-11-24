import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { login } from '../../redux/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import Button from '../../components/UI/Button';

import style from './LoginPage.module.scss';

interface FormFields {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userIsAuth = useAppSelector((state) => state.user.isAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const [formError, setFormError] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setFormError(null);
    try {
      await axios.post(
        'http://localhost:4444/auth/login',
        { email: data.email, password: data.password },
        { withCredentials: true }
      );

      const result = await axios.get('http://localhost:4444/auth/me', {
        withCredentials: true,
      });
      dispatch(login({ ...result.data, isAuth: true }));
    } catch (error) {
      setFormError('Неверный E-Mail или пароль.');
    }
  };
  if (userIsAuth) return <Navigate to="/" />;
  return (
    <main className={style.root}>
      <div className={style.container}>
        <form className={style.login} onSubmit={handleSubmit(onSubmit)}>
          <h2>Мы скучали!</h2>
          <p>Выполните вход, что-бы продолжить...</p>
          {formError && (
            <div className={style.error}>
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
              >
                <path
                  d="M2.5 2.5l10 10m-5 2a7 7 0 110-14 7 7 0 010 14z"
                  stroke="currentColor"
                ></path>
              </svg>{' '}
              {formError}
            </div>
          )}
          <div className={style.fields}>
            <div
              className={`${style.field} ${
                errors.email ? style.fieldError : ''
              }`}
            >
              <label htmlFor="email" className={style.label}>
                Ваш E-Mail адрес:
              </label>
              <div className={style.inputWrapper}>
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.5 5L7.5 9L14.5 5M1.5 2H13.5C13.7652 2 14.0196 2.10536 14.2071 2.29289C14.3946 2.48043 14.5 2.73478 14.5 3V13C14.5 13.2652 14.3946 13.5196 14.2071 13.7071C14.0196 13.8946 13.7652 14 13.5 14H1.5C1.23478 14 0.98043 13.8946 0.792893 13.7071C0.605357 13.5196 0.5 13.2652 0.5 13V3C0.5 2.73478 0.605357 2.48043 0.792893 2.29289C0.98043 2.10536 1.23478 2 1.5 2V2Z"
                    stroke="#727C85"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="example@email.com"
                  id="email"
                  {...register('email', {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
              </div>
            </div>

            <div
              className={`${style.field} ${
                errors.password ? style.fieldError : ''
              }`}
            >
              <label htmlFor="password" className={style.label}>
                Пароль:
              </label>
              <div className={style.inputWrapper}>
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M12.5 9V8C12.5 7.73478 12.3946 7.48043 12.2071 7.29289C12.0196 7.10536 11.7652 7 11.5 7H1.5C1.23478 7 0.98043 7.10536 0.792893 7.29289C0.605357 7.48043 0.5 7.73478 0.5 8V14C0.5 14.2652 0.605357 14.5196 0.792893 14.7071C0.98043 14.8946 1.23478 15 1.5 15H11.5C11.7652 15 12.0196 14.8946 12.2071 14.7071C12.3946 14.5196 12.5 14.2652 12.5 14V13M12.5 9H8.5C7.96957 9 7.46086 9.21071 7.08579 9.58579C6.71071 9.96086 6.5 10.4696 6.5 11C6.5 11.5304 6.71071 12.0391 7.08579 12.4142C7.46086 12.7893 7.96957 13 8.5 13H12.5M12.5 9C13.0304 9 13.5391 9.21071 13.9142 9.58579C14.2893 9.96086 14.5 10.4696 14.5 11C14.5 11.5304 14.2893 12.0391 13.9142 12.4142C13.5391 12.7893 13.0304 13 12.5 13M3.5 7V4C3.5 3.20435 3.81607 2.44129 4.37868 1.87868C4.94129 1.31607 5.70435 1 6.5 1C7.29565 1 8.05871 1.31607 8.62132 1.87868C9.18393 2.44129 9.5 3.20435 9.5 4V7M12 11H13M10 11H11M8 11H9"
                      stroke="#727C85"
                    />
                  </g>
                </svg>
                <input
                  type="password"
                  placeholder="********"
                  id="password"
                  {...register('password', {
                    required: true,
                    minLength: 8,
                    maxLength: 128,
                  })}
                />
              </div>
            </div>
            <div className={style.bottom}>
              <div className={style.checkWrapper}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  {...register('rememberMe')}
                />
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
