import React from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import PostCard from '../../components/PostCard';

import { IPost } from '../../@types/custom';

import style from './PostPage.module.scss';

const sortByList = [
  { name: 'популярности', key: 'views', order: 'desc' },
  { name: 'новизне', key: 'createdAt', order: 'desc' },
  { name: 'кол-ву лайков', key: 'likes', order: 'desc' },
  { name: 'кол-ву комментариев', key: 'comments', order: 'desc' },
  { name: 'кол-ву диз-лайков', key: 'dislikes', order: 'desc' },
];

const sortDateList = [
  { name: 'сегодня', keyFrom: new Date().toLocaleDateString() },
  {
    name: 'вчера',
    keyFrom: new Date(
      (new Date() as any) - 60 * 60 * 24 * 1000
    ).toLocaleDateString(),
    keyTo: new Date().toLocaleDateString(),
  },
  { name: 'всё время' },
];

const PostsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = React.useState<IPost[] | null>(null);
  const [sortBy, setSortBy] = React.useState<number>(
    sortByList.findIndex(
      (item) =>
        item.key === searchParams.get('sortBy') &&
        item.order === searchParams.get('order')
    ) !== -1
      ? sortByList.findIndex(
          (item) =>
            item.key === searchParams.get('sortBy') &&
            item.order === searchParams.get('order')
        )
      : 1
  );
  const [sortDate, setSortDate] = React.useState<number>(2);
  const [sortByPopup, setSortByPopup] = React.useState(false);
  const [sortDatePopup, setSortDatePopup] = React.useState(false);

  React.useEffect(() => {
    const parseQueryParams = () => {
      const result = [];
      result.push(`sortBy=${sortByList[sortBy].key}`);
      result.push(`order=${sortByList[sortBy].order}`);
      if (sortDateList[sortDate].keyFrom) {
        result.push(`dateFrom=${sortDateList[sortDate].keyFrom}`);
      }
      if (sortDateList[sortDate].keyTo) {
        result.push(`dateTo=${sortDateList[sortDate].keyTo}`);
      }

      return result;
    };

    async function fetchData() {
      const result = await axios.get<IPost[]>(
        `http://localhost:4444/post?${parseQueryParams().join('&')}`
      );
      setData(result.data);
    }

    setData(null);

    try {
      fetchData();
    } catch (error) {
      console.error(error);
      alert('Ошибка при загрузке постов...');
    }
  }, [searchParams, sortBy, sortDate]);

  return (
    <div className={style.root}>
      <div className={style.container}>
        <div className={style.header}>
          <h2>Все посты:</h2>
          <div className={style.sorting}>
            <button
              className={style.sortingItem}
              onClick={() => setSortByPopup((prev) => !prev)}
            >
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
              >
                <path
                  d="M4.5 6.5l3 3 3-3"
                  stroke="currentColor"
                  strokeLinecap="square"
                ></path>
              </svg>
              <p>Сортировать по:</p>
              <span>{sortByList[sortBy].name}</span>
              {sortByPopup && (
                <div className={style.sortingItemPopup}>
                  {sortByList.map((item, idx) => (
                    <p key={idx} onClick={() => setSortBy(idx)}>
                      {item.name}
                    </p>
                  ))}
                </div>
              )}
            </button>
            <button
              className={style.sortingItem}
              onClick={() => setSortDatePopup((prev) => !prev)}
            >
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
              >
                <path
                  d="M4.5 6.5l3 3 3-3"
                  stroke="currentColor"
                  strokeLinecap="square"
                ></path>
              </svg>
              <p>За:</p>
              <span>{sortDateList[sortDate].name}</span>
              {sortDatePopup && (
                <div className={style.sortingItemPopup}>
                  {sortDateList.map((item, idx) => (
                    <p key={idx} onClick={() => setSortDate(idx)}>
                      {item.name}
                    </p>
                  ))}
                </div>
              )}
            </button>
          </div>
        </div>
        <div className={style.grid}>
          {data
            ? data.map((item) => (
                <PostCard
                  key={item._id}
                  {...item}
                  likes={new Map(item.likes)}
                  dislikes={new Map(item.dislikes)}
                />
              ))
            : 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
