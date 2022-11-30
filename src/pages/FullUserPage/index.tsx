import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

import { IPost, IUser } from '../../@types/custom';

import { useAppSelector } from '../../redux/store';

import CommentItem from '../../components/CommentItem';
import PostCard from '../../components/PostCard';
import Button from '../../components/UI/Button';

import style from './FullUserPage.module.scss';
import { appAxios } from '../../App';

const FullUserPage: React.FC = () => {
  const { userId } = useParams();

  const user = useAppSelector((state) => state.user);

  const [data, setData] = React.useState<IUser | null>(null);
  const [isAllPosts, setIsAllPosts] = React.useState<boolean>(false);
  const [favoritePosts, setFavoritePosts] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const result = await appAxios.get<IUser>(
          `http://localhost:4444/users/${userId}`
        );
        setData(result.data);
      } catch (error) {
        setData(null);
        console.error(error);
        alert('Ошибка при загрузке пользователя...');
      }
    }

    fetchUser();
  }, [userId]);

  React.useEffect(() => {
    axios
      .get<IPost[]>(`http://localhost:4444/users/${user._id}/favorites`)
      .then((result) => setFavoritePosts(result.data));
  }, [user._id]);

  return (
    <div className={style.root}>
      <div className={style.container}>
        <div className={style.aside}>
          {data ? (
            <div className={style.userInfo}>
              <div className={style.userInfoTop}>
                <div className={style.userInfoAvatar}>
                  {data.avatar ? (
                    <img
                      src={`http://localhost:4444/uploads/${data.avatar}`}
                      alt={data.username}
                    />
                  ) : (
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path
                          d="M10.5 3.99799C10.4999 4.39182 10.4222 4.78177 10.2713 5.14558C10.1205 5.50938 9.89948 5.83992 9.62091 6.11831C9.34233 6.3967 9.01165 6.61749 8.64774 6.76808C8.28384 6.91868 7.89383 6.99612 7.5 6.99599C6.90685 6.99579 6.32709 6.81971 5.83401 6.49001C5.34094 6.16031 4.95671 5.6918 4.7299 5.14373C4.5031 4.59566 4.44391 3.99264 4.55982 3.41093C4.67573 2.82922 4.96154 2.29494 5.38109 1.87567C5.80065 1.45639 6.33512 1.17094 6.9169 1.05542C7.49869 0.939894 8.10167 0.999485 8.64959 1.22666C9.19751 1.45383 9.66576 1.83837 9.99513 2.33166C10.3245 2.82496 10.5002 3.40484 10.5 3.99799V3.99799ZM12.5 14.99H2.5V12.994C2.5 12.1983 2.81607 11.4353 3.37868 10.8727C3.94129 10.3101 4.70435 9.99399 5.5 9.99399H9.5C10.2956 9.99399 11.0587 10.3101 11.6213 10.8727C12.1839 11.4353 12.5 12.1983 12.5 12.994V14.991V14.99Z"
                          stroke="#727C85"
                          strokeLinecap="square"
                        />
                      </g>
                    </svg>
                  )}
                </div>
                <div className={style.userInfoTopColumn}>
                  <h4>{data.username}</h4>
                  {data._id === user._id ? (
                    <Button size="small" href="/user/settings">
                      Настройки профиля
                    </Button>
                  ) : (
                    <Button size="small">Подписаться</Button>
                  )}
                </div>
              </div>
              <div className={style.userInfoBottom}>
                <div className={style.userInfoItem}>
                  <h4>{data.posts.length}</h4>
                  <p>постов</p>
                </div>
                <div className={style.userInfoItem}>
                  <h4>40</h4>
                  <p>подписок</p>
                </div>
                <div className={style.userInfoItem}>
                  <h4>73</h4>
                  <p>подписчика</p>
                </div>
              </div>
            </div>
          ) : (
            'Loading...'
          )}
          {data ? (
            <div className={style.userComments}>
              <h3>Последние комментарии:</h3>
              <div className={style.userCommentsList}>
                {data.comments.length ? (
                  data.comments.map((comment) => (
                    <CommentItem key={comment._id} {...comment} author={data} />
                  ))
                ) : (
                  <p>Пользователь не оставлял комментариев...</p>
                )}
              </div>
            </div>
          ) : (
            'Loading...'
          )}
        </div>
        {!data?.posts.length ? (
          <div className={style.popularPosts}>
            <h2>У этого пользователя ещё нет постов...</h2>
          </div>
        ) : (
          <div className={style.popularPosts}>
            <h2>
              {isAllPosts
                ? 'Все посты пользователя:'
                : 'Популярные посты пользователя:'}
            </h2>
            <div className={style.popularPostsGrid}>
              {data
                ? data.posts
                    .sort((a, b) =>
                      a[isAllPosts ? 'createdAt' : 'views'] >
                      b[isAllPosts ? 'createdAt' : 'views']
                        ? -1
                        : 1
                    )
                    .slice(0, isAllPosts ? data.posts.length : 4)
                    .map((post) => (
                      <PostCard
                        key={post._id}
                        {...post}
                        author={data}
                        likes={new Map(Array.from(post.likes))}
                        dislikes={new Map(Array.from(post.dislikes))}
                        isFavorite={
                          !!favoritePosts.find((fav) => fav._id === post._id)
                        }
                      />
                    ))
                : 'Loading...'}
            </div>
            {!isAllPosts && (
              <Button
                className={style.popularPostsButton}
                onClick={() => {
                  setIsAllPosts(true);
                  window.scroll(0, 0);
                }}
              >
                Посмотреть все
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullUserPage;
