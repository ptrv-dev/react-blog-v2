import React from 'react';
import PostCard from '../components/PostCard';
import Button from '../components/UI/Button';

import style from '../styles/HomePage.module.scss';

const popularTodayPosts = [
  {
    _id: 1,
    image: '3.jpg',
    title: 'Какой-то заголовок для поста',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, fuga. Reprehenderit saepe ad eos nesciunt. Officia enim porro doloribus ducimus.',
  },
  {
    _id: 2,
    image: '1.jpg',
    title: 'Какой-то заголовок для поста',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, fuga. Reprehenderit saepe ad eos nesciunt. Officia enim porro doloribus ducimus.',
  },
  {
    _id: 3,
    image: '2.jpg',
    title: 'Какой-то заголовок для поста',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, fuga. Reprehenderit saepe ad eos nesciunt. Officia enim porro doloribus ducimus.',
  },
  {
    _id: 4,
    image: '4.jpg',
    title: 'Какой-то заголовок для поста',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, fuga. Reprehenderit saepe ad eos nesciunt. Officia enim porro doloribus ducimus.',
  },
];

const HomePage: React.FC = () => {
  return (
    <div className={style.root}>
      <div className={style.container}>
        <div className={style.body}>
          <h2>Популярное за сегодня:</h2>
          <div className={style.grid}>
            {popularTodayPosts.map((item) => (
              <PostCard key={item._id} {...item} />
            ))}
          </div>
          <Button className={style.button}>Посмотреть все</Button>
        </div>
        <div className={style.aside}>ASIDE</div>
      </div>
    </div>
  );
};

export default HomePage;
