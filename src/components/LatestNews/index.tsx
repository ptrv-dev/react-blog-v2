import React from 'react';

import style from './LatestNews.module.scss';
import News from './News';

const LatestNews: React.FC = () => {
  return (
    <div className={style.root}>
      <h3>Последние новости:</h3>
      <div className={style.column}>
        {[...Array(3)].map((item, idx) => (
          <News
            key={idx}
            _id="123"
            image="1.jpg"
            title="Какой-то заголовок для новости"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quasi temporibus quidem, pariatur molestiae autem."
          />
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
