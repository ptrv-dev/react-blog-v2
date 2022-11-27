import React from 'react';
import universalCookie from 'universal-cookie';
import { Link } from 'react-router-dom';

import { logout } from '../../redux/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import Search from '../Search';
import Button from '../UI/Button';

import style from './Header.module.scss';
import PostCreateModal from '../PostCreateModal';

const Actions: React.FC = () => {
  const Cookies = new universalCookie();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const userButtonRef = React.useRef<HTMLDivElement>(null);

  const [isUserMenuActive, setIsUserMenuActive] =
    React.useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (
        userButtonRef.current &&
        !event.composedPath().includes(userButtonRef.current)
      )
        setIsUserMenuActive(false);
    };

    window.addEventListener('click', clickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove('token');
  };

  const handlePostCreate = () => setIsModalVisible(true);

  if (user.isAuth)
    return (
      <>
        <div
          className={style.user}
          ref={userButtonRef}
          onClick={() => setIsUserMenuActive((prev) => !prev)}
        >
          <div className={style.userImage}>
            {user.avatar ? (
              <img
                src={`/assets/img/users/${user.avatar}`}
                alt={user.username}
              />
            ) : (
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
              >
                <path
                  clipRule="evenodd"
                  d="M10.5 3.498a2.999 2.999 0 01-3 2.998 2.999 2.999 0 113-2.998zm2 10.992h-10v-1.996a3 3 0 013-3h4a3 3 0 013 3v1.997z"
                  stroke="currentColor"
                  strokeLinecap="square"
                ></path>
              </svg>
            )}
          </div>
          <div className={style.userColumn}>
            <h4>{user.username}</h4>
            <p>{user.email}</p>
          </div>
          {isUserMenuActive && (
            <div className={style.userMenu}>
              <Link to={`/users/${user._id}`} className={style.userMenuItem}>
                Мой профиль
              </Link>
              <Link
                to={`/users/${user.username}/settings`}
                className={style.userMenuItem}
              >
                Настройки профиля
              </Link>
              <button className={style.userMenuItem} onClick={handlePostCreate}>
                Создать пост
              </button>
              <button className={style.userMenuItem} onClick={handleLogout}>
                Выйти из аккаунта
              </button>
            </div>
          )}
        </div>
        {isModalVisible && (
          <PostCreateModal closeModal={() => setIsModalVisible(false)} />
        )}
      </>
    );

  return (
    <>
      <Button href="/auth/login">Войти</Button>
      <Button variant="text" href="auth/registration">
        Создать аккаунт
      </Button>
    </>
  );
};

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
          <img src="/assets/img/logo.svg" alt="likbezz logo" />
        </Link>
        {width > 550 && <Search />}
        {width > 768 ? (
          <div className={style.actions}>
            <Actions />
          </div>
        ) : (
          isMenuActive && (
            <div className={style.menu}>
              {width <= 550 && <Search />}
              <Actions />
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
