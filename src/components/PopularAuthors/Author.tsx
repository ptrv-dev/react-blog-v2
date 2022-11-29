import React from 'react';

import style from './Author.module.scss';

interface AuthorProps {
  _id: string;
  image: string;
  username: string;
  views: number;
  likes: number;
  dislikes: number;
}

const Author: React.FC<AuthorProps> = ({
  _id,
  image,
  username,
  views,
  likes,
  dislikes,
}) => {
  return (
    <div className={style.root}>
      <div className={style.image}>
        {image ? (
          <img src={`http://localhost:4444/uploads/${image}`} alt={username} />
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

      <div className={style.column}>
        <h4>{username}</h4>
        <div className={style.row}>
          <span className={style.item}>
            <img src="/assets/img/icons/eye-icon.svg" alt="Views" />
            {views}
          </span>
          <span className={style.item}>
            <img src="/assets/img/icons/thumb-up-icon.svg" alt="Likes" />
            {likes}
          </span>
          <span className={style.item}>
            <img src="/assets/img/icons/thumb-down-icon.svg" alt="Dislikes" />
            {dislikes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Author;
