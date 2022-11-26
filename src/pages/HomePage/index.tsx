import axios from 'axios';
import React from 'react';

import LatestNews from '../../components/LatestNews';
import PopularAuthors from '../../components/PopularAuthors';
import PostCard from '../../components/PostCard';
import Button from '../../components/UI/Button';

import { IPost } from '../../@types/custom';

import style from './HomePage.module.scss';

const HomePage: React.FC = () => {
  const [latestPosts, setLatestPosts] = React.useState<IPost[]>([]);
  const [popularPosts, setPopularPosts] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    async function fetchPosts() {
      const date = new Date().toLocaleDateString();

      setPopularPosts([]);
      setLatestPosts([]);

      axios
        .get<IPost[]>(
          `http://localhost:4444/post?dateFrom=${date}&sortBy=views&order=desc&limit=4`
        )
        .then((result) => setPopularPosts(result.data));

      axios
        .get<IPost[]>(
          `http://localhost:4444/post?&sortBy=createdAt&order=desc&limit=4`
        )
        .then((result) => setLatestPosts(result.data));
    }
    fetchPosts();
  }, []);

  const todayDate = new Date().toLocaleDateString();

  return (
    <div className={style.root}>
      <div className={style.container}>
        <div className={style.body}>
          <section>
            <h2>Популярное за сегодня:</h2>
            <div className={style.grid}>
              {popularPosts.map((item) => (
                <PostCard
                  key={item._id}
                  {...item}
                  likes={new Map(item.likes)}
                  dislikes={new Map(item.dislikes)}
                />
              ))}
            </div>
            <Button
              className={style.button}
              href={`/posts?sortBy=views&order=desc&dateFrom=${todayDate}`}
            >
              Посмотреть все
            </Button>
          </section>
          <section>
            <h2>Последнее:</h2>
            <div className={style.grid}>
              {latestPosts.map((item) => (
                <PostCard
                  key={item._id}
                  {...item}
                  likes={new Map(item.likes)}
                  dislikes={new Map(item.dislikes)}
                />
              ))}
            </div>
            <Button
              className={style.button}
              href="/posts?sortBy=createdAt&order=desc"
            >
              Посмотреть все
            </Button>
          </section>
        </div>
        <div className={style.aside}>
          <PopularAuthors />
          <LatestNews />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
