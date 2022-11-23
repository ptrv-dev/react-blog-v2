import React from 'react';

import Author from './Author';

import style from './PopularAuthors.module.scss';

const PopularAuthors: React.FC = () => {
  return (
    <div className={style.root}>
      <h3>Популярные авторы:</h3>
      <div className={style.column}>
        {[...Array(5)].map((item, idx) => (
          <Author
            _id={String(idx + 10)}
            image={'43.jpg'}
            username="Fred Marshall"
            views={13405}
            likes={1749}
            dislikes={103}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularAuthors;
