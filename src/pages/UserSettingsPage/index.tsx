import React from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '../../redux/store';

import { IUser } from '../../@types/custom';

import Button from '../../components/UI/Button';

import style from './UserSettingsPage.module.scss';
import { appAxios } from '../../App';

interface FormFields {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
}

const UserSettingsPage: React.FC = () => {
  const user = useAppSelector((state) => state.user);

  const [data, setData] = React.useState<IUser | null>(null);
  const [image, setImage] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormFields>({
    defaultValues: { username: data?.username, email: data?.email },
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await appAxios.get(`/users/${user._id}`);
        setData(result.data);
      } catch (error) {
        setData(null);
        console.error(error);
        alert('Ошибка при получении пользователя...');
      }
    }
    fetchData();
  }, [user]);

  React.useEffect(() => {
    if (data) {
      setValue('username', data.username);
      setValue('email', data.email);
    }
  }, [data, setValue]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result as string);
  };

  const handleDeleteImage = () => {
    if (!window.confirm('Удалить аватар?')) return false;

    setImage(null);
    if (data && data.avatar) {
      axios
        .patch(
          'http://localhost:4444/users',
          { avatar: '' },
          { withCredentials: true }
        )
        .then(() => window.location.reload());
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!window.confirm('Сохранить изменения?')) return false;
    try {
      let image;
      if (inputRef.current && inputRef.current.files) {
        const formData = new FormData();
        formData.append('image', inputRef.current.files[0]);
        const { data } = await appAxios.post('/upload', formData);
        image = data.filename;
      }
      await appAxios.patch('/users', {
        avatar: image,
        username: data.username || undefined,
        email: data.email || undefined,
        currentPassword: data.currentPassword || undefined,
        newPassword: data.newPassword || undefined,
      });
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setFormError(
          error.response?.data.message === 'Incorrect current password'
            ? 'Неверный текущий пароль!'
            : 'Ошибка'
        );
      }
    }
  };

  return (
    <div className={style.root}>
      <div className={style.container}>
        {data ? (
          <div className={style.userInfo}>
            <div className={style.userInfoTop}>
              <div className={style.userInfoAvatar}>
                {image ? (
                  <img src={image} alt="" />
                ) : data.avatar ? (
                  <img
                    src={`http://localhost:4444/uploads/${data.avatar}`}
                    alt=""
                  />
                ) : (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M10.5 3.99799C10.4999 4.39182 10.4222 4.78177 10.2713 5.14558C10.1205 5.50938 9.89948 5.83992 9.62091 6.11831C9.34233 6.3967 9.01165 6.61749 8.64774 6.76808C8.28384 6.91868 7.89383 6.99612 7.5 6.99599C6.90685 6.99579 6.32709 6.81971 5.83401 6.49001C5.34094 6.16031 4.95671 5.6918 4.7299 5.14373C4.5031 4.59566 4.44391 3.99264 4.55982 3.41093C4.67573 2.82922 4.96154 2.29494 5.38109 1.87567C5.80065 1.45639 6.33512 1.17094 6.9169 1.05542C7.49869 0.939894 8.10167 0.999485 8.64959 1.22666C9.19751 1.45383 9.66576 1.83837 9.99513 2.33166C10.3245 2.82496 10.5002 3.40484 10.5 3.99799V3.99799ZM12.5 14.99H2.5V12.994C2.5 12.1983 2.81607 11.4353 3.37868 10.8727C3.94129 10.3101 4.70435 9.99399 5.5 9.99399H9.5C10.2956 9.99399 11.0587 10.3101 11.6213 10.8727C12.1839 11.4353 12.5 12.1983 12.5 12.994V14.991V14.99Z"
                        stroke="#727C85"
                        strokeLinecap="square"
                      />
                    </g>
                  </svg>
                )}
              </div>
              <div className={style.userInfoTopColumn}>
                <h4>{data.username}</h4>
                {data._id === user._id ? (
                  <Button size="small">Настройки профиля</Button>
                ) : (
                  <Button size="small">Подписаться</Button>
                )}
              </div>
            </div>
            <div className={style.userInfoBottom}>
              <div className={style.userInfoItem}>
                <h4>{data.posts?.length}</h4>
                <p>постов</p>
              </div>
              <div className={style.userInfoItem}>
                <h4>40</h4>
                <p>подписок</p>
              </div>
              <div className={style.userInfoItem}>
                <h4>73</h4>
                <p>подписчика</p>
              </div>
            </div>
          </div>
        ) : (
          'Loading...'
        )}
        {data ? (
          <form onSubmit={handleSubmit(onSubmit)} className={style.body}>
            <h3>Настройки профиля:</h3>
            <div className={style.settings}>
              <div className={style.settingsItem}>
                <input
                  type="file"
                  onChange={handleInput}
                  accept="image/png, image/jpeg"
                  style={{ display: 'none' }}
                  ref={inputRef}
                />
                <h4>Аватар:</h4>
                <span>
                  <Button
                    type="button"
                    size="small"
                    onClick={() => inputRef.current?.click()}
                  >
                    Загрузить
                  </Button>
                  {(data?.avatar || image) && (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={handleDeleteImage}
                      type="button"
                    >
                      Удалить
                    </Button>
                  )}
                </span>
              </div>
              <div
                className={`${style.settingsItem} ${
                  errors.username ? style.settingsItemError : ''
                }`}
              >
                <h4>Имя пользователя:</h4>
                <input
                  type="text"
                  {...register('username', {
                    minLength: 4,
                    maxLength: 64,
                  })}
                />
              </div>
              <div
                className={`${style.settingsItem} ${
                  errors.email ? style.settingsItemError : ''
                }`}
              >
                <h4>E-Mail адрес:</h4>
                <input
                  type="text"
                  {...register('email', {
                    pattern: /^\S+@\S+$/i,
                  })}
                />
              </div>
              <hr />
              <div
                className={`${style.settingsItem} ${
                  errors.currentPassword ? style.settingsItemError : ''
                }`}
              >
                <h4>Текущий пароль:</h4>
                <input
                  type="password"
                  placeholder="************"
                  {...register('currentPassword', {
                    minLength: 8,
                    maxLength: 128,
                  })}
                />
              </div>
              <div
                className={`${style.settingsItem} ${
                  errors.newPassword ? style.settingsItemError : ''
                }`}
              >
                <h4>Новый пароль:</h4>
                <input
                  type="password"
                  placeholder="************"
                  {...register('newPassword', { minLength: 8, maxLength: 128 })}
                />
              </div>
            </div>
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
                </svg>
                {formError}
              </div>
            )}
            <div className={style.buttons}>
              <Button type="submit">
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M4.5 15V12C4.5 11.7348 4.60536 11.4804 4.79289 11.2929C4.98043 11.1054 5.23478 11 5.5 11H9.5C9.76522 11 10.0196 11.1054 10.2071 11.2929C10.3946 11.4804 10.5 11.7348 10.5 12V15M13.5 15H1.5C1.23478 15 0.98043 14.8946 0.792893 14.7071C0.605357 14.5196 0.5 14.2652 0.5 14V2C0.5 1.73478 0.605357 1.48043 0.792893 1.29289C0.98043 1.10536 1.23478 1 1.5 1H10.086C10.3512 1.00006 10.6055 1.10545 10.793 1.293L14.207 4.707C14.3945 4.89449 14.4999 5.14881 14.5 5.414V14C14.5 14.2652 14.3946 14.5196 14.2071 14.7071C14.0196 14.8946 13.7652 15 13.5 15Z"
                      stroke="#F5F5F5"
                    />
                  </g>
                </svg>
                Сохранить
              </Button>
              <Button
                className={style.buttonDanger}
                variant="outlined"
                type="button"
              >
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M4.5 3.5V2C4.5 1.73478 4.60536 1.48043 4.79289 1.29289C4.98043 1.10536 5.23478 1 5.5 1H9.5C9.76522 1 10.0196 1.10536 10.2071 1.29289C10.3946 1.48043 10.5 1.73478 10.5 2V3.5M0 4H15M1.5 4V14C1.5 14.2652 1.60536 14.5196 1.79289 14.7071C1.98043 14.8946 2.23478 15 2.5 15H12.5C12.7652 15 13.0196 14.8946 13.2071 14.7071C13.3946 14.5196 13.5 14.2652 13.5 14V4M7.5 7.5V12.5M4.5 9.5V12.5M10.5 9.5V12.5"
                      stroke="#D72323"
                    />
                  </g>
                </svg>
                Удалить аккаунт
              </Button>
            </div>
          </form>
        ) : (
          'Loading'
        )}
      </div>
    </div>
  );
};

export default UserSettingsPage;
