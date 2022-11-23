import React from 'react';

import style from './News.module.scss';

interface NewsProps {
  _id: string;
  image: string;
  title: string;
  text: string;
}

const News: React.FC<NewsProps> = ({ _id, image, title, text }) => {
  return (
    <div className={style.root}>
      <img src="/assets/img/news/1.jpg" alt={title} />
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
};

export default News;
