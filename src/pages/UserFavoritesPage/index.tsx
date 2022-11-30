import React from 'react';
import { useParams } from 'react-router-dom';

import { IPost } from '../../@types/custom';
import { appAxios } from '../../App';
import PostCard from '../../components/PostCard';

import style from './UserFavoritesPage.module.scss';

const UserFavoritesPage: React.FC = () => {
  const { userId } = useParams();

  const [data, setData] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    async function fetchPosts() {
      try {
        const result = await appAxios.get(`/users/${userId}/favorites`);
        setData(result.data);
      } catch (error) {
        setData([]);
        console.error(error);
        alert('Ошибка при получении избранных постов...');
      }
    }
    fetchPosts();
  }, [userId]);

  return (
    <div className={style.root}>
      <div className={style.container}>
        <h2>{data.length ? 'Избранные посты:' : 'Нету избранных постов...'}</h2>
        <div className={style.grid}>
          {data
            ? data.map((post) => (
                <PostCard key={post._id} {...post} isFavorite={true} />
              ))
            : 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default UserFavoritesPage;
