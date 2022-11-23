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
      <img
        src={`./assets/img/users/${image}`}
        alt={username}
        className={style.image}
      />
      <div className={style.column}>
        <h4>{username}</h4>
        <div className={style.row}>
          <span className={style.item}>
            <img src="./assets/img/icons/eye-icon.svg" alt="Views" />
            {views}
          </span>
          <span className={style.item}>
            <img src="./assets/img/icons/thumb-up-icon.svg" alt="Likes" />
            {likes}
          </span>
          <span className={style.item}>
            <img src="./assets/img/icons/thumb-down-icon.svg" alt="Dislikes" />
            {dislikes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Author;
