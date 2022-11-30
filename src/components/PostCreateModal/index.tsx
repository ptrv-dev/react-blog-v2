import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { appAxios } from '../../App';

import Button from '../UI/Button';

import style from './PostCreateModal.module.scss';

interface PostCreateModalProps {
  closeModal: () => void;
}

interface FormFields {
  title: string;
  text: string;
}

const PostCreateModal: React.FC<PostCreateModalProps> = ({ closeModal }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState<string | null>(null);

  const handleTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = '44px';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result as string);
  };
  const handleImageRemove = () =>
    window.confirm('Удалить изображение?') && setImage(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // get image from form and upload it to server
      let image = '';
      if (inputRef.current && inputRef.current!.files) {
        const formData = new FormData();
        formData.append('image', inputRef.current.files[0]);
        const { data } = await appAxios.post('/upload', formData);
        image = data.filename;
      }
      // post create
      const result = await appAxios.post('/post', {
        image: image,
        ...data,
      });
      alert('Ваш пост успешно создан!');
      closeModal();
      navigate(`/post/${result.data._id}`);
    } catch (error) {
      console.error(error);
      alert('Post Create Error!');
    }
  };

  return (
    <div className={style.root}>
      <form className={style.modal} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          style={{ display: 'none' }}
          ref={inputRef}
          onChange={handleInput}
        />
        <div className={style.image}>
          {image ? (
            <>
              <img src={image} alt="" className={style.imageImg} />
              <button className={style.icon} onClick={handleImageRemove}>
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                >
                  <path
                    d="M4.5 3V1.5a1 1 0 011-1h4a1 1 0 011 1V3M0 3.5h15m-13.5 0v10a1 1 0 001 1h10a1 1 0 001-1v-10M7.5 7v5m-3-3v3m6-3v3"
                    stroke="#fff"
                  ></path>
                </svg>
              </button>
            </>
          ) : (
            <button
              onClick={() => inputRef.current?.click()}
              className={style.addButton}
              type="button"
            >
              <svg
                width="76"
                height="76"
                viewBox="0 0 76 76"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 3H8C6.67392 3 5.40215 3.52678 4.46447 4.46447C3.52678 5.40215 3 6.67392 3 8V20.5M30.5 3H45.5M55.5 3H68C69.3261 3 70.5979 3.52678 71.5355 4.46447C72.4732 5.40215 73 6.67392 73 8V20.5M3 30.5V45.5M73 30.5V45.5M3 55.5V68C3 69.3261 3.52678 70.5979 4.46447 71.5355C5.40215 72.4732 6.67392 73 8 73H20.5M73 55.5V68C73 69.3261 72.4732 70.5979 71.5355 71.5355C70.5979 72.4732 69.3261 73 68 73H55.5M38 20.5V55.5M20.5 38H55.5M30.5 73H45.5"
                  stroke="#206FF3"
                />
              </svg>
            </button>
          )}
        </div>
        <textarea
          className={`${style.title} ${errors.title ? style.fieldError : ''}`}
          placeholder="Заголовок для вашего поста"
          rows={1}
          {...register('title', {
            required: true,
            minLength: 8,
            maxLength: 128,
            onChange: handleTitle,
          })}
        />
        <textarea
          className={`${style.text} ${errors.text ? style.fieldError : ''}`}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          {...register('text', {
            required: true,
            minLength: 10,
            maxLength: 4096,
          })}
        />
        <div className={style.bottom}>
          <Button variant="text" onClick={closeModal}>
            Отмена
          </Button>
          <Button>Создать</Button>
        </div>
      </form>
    </div>
  );
};

export default PostCreateModal;
