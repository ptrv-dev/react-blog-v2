import axios from 'axios';
import React from 'react';

import LatestNews from '../../components/LatestNews';
import PopularAuthors from '../../components/PopularAuthors';
import PostCard from '../../components/PostCard';
import Button from '../../components/UI/Button';

import { IPost } from '../../@types/custom';

import style from './HomePage.module.scss';

const HomePage: React.FC = () => {
  const [posts, setPosts] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    async function fetchPosts() {
      setPosts([]);
      const date = new Date().toLocaleDateString();
      const { data } = await axios.get<IPost[]>(
        `http://localhost:4444/post?date=${date}&sortBy=views&order=desc&limit=4`
      );
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className={style.root}>
      <div className={style.container}>
        <div className={style.body}>
          <h2>Популярное за сегодня:</h2>
          <div className={style.grid}>
            {posts.map((item) => (
              <PostCard
                key={item._id}
                {...item}
                likes={new Map(item.likes)}
                dislikes={new Map(item.dislikes)}
              />
            ))}
          </div>
          <Button className={style.button} href="/popular">
            Посмотреть все
          </Button>
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
