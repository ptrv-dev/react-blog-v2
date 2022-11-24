import React from 'react';

import Button from '../UI/Button';

import style from './PostCreateModal.module.scss';

interface PostCreateModalProps {
  closeModal: () => void;
}

const PostCreateModal: React.FC<PostCreateModalProps> = ({ closeModal }) => {
  const handleTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = '44px';
    event.target.style.height = event.target.scrollHeight + 'px';
  };
  return (
    <div className={style.root}>
      <div className={style.modal}>
        <div className={style.image}>
          <button>
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
        </div>
        <textarea
          name="title"
          className={style.title}
          placeholder="Заголовок для вашего поста"
          onChange={handleTitle}
          rows={1}
        />
        <textarea
          name="text"
          className={style.text}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        />
        <div className={style.bottom}>
          <Button variant="text" onClick={closeModal}>
            Отмена
          </Button>
          <Button>Создать</Button>
        </div>
      </div>
    </div>
  );
};

export default PostCreateModal;
