import React from 'react';
import axios from 'axios';

import { IUser } from '../../@types/custom';

import Author from './Author';

import style from './PopularAuthors.module.scss';

interface IUserExt extends IUser {
  totalViews: number;
  totalLikes: number;
  totalDislikes: number;
}

const PopularAuthors: React.FC = () => {
  const [data, setData] = React.useState<IUserExt[]>([]);

  React.useEffect(() => {
    async function fetchUsers() {
      setData([]);
      try {
        const result = await axios.get<IUser[]>('http://localhost:4444/users');
        setData(
          result.data.map((user) =>
            Object.assign(user, {
              totalViews: user.posts.reduce((acc, post) => acc + post.views, 0),
              totalLikes: user.posts.reduce(
                (acc, post) => acc + Object.keys(post.likes).length,
                0
              ),
              totalDislikes: user.posts.reduce(
                (acc, post) => acc + Object.keys(post.dislikes).length,
                0
              ),
            })
          )
        );
      } catch (error) {
        setData([]);
        console.error(error);
        alert('Ошибка при получении популярных авторов...');
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className={style.root}>
      <h3>Популярные авторы:</h3>
      <div className={style.column}>
        {data
          .sort((a, b) => (a.totalViews < b.totalViews ? 1 : -1))
          .slice(0, 5)
          .map((item) => (
            <Author
              key={item._id}
              _id={item._id}
              image={item.avatar}
              username={item.username}
              views={item.totalViews}
              likes={item.totalLikes}
              dislikes={item.totalDislikes}
            />
          ))}
      </div>
    </div>
  );
};

export default PopularAuthors;
