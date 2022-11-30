import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { IComment, IPost } from '../../@types/custom';

import { useAppSelector } from '../../redux/store';

import Button from '../../components/UI/Button';

import style from './FullPostPage.module.scss';
import WriteComment from '../../components/WriteComment';
import CommentItem from '../../components/CommentItem';
import { appAxios } from '../../App';

const FullPostPage: React.FC = () => {
  const { postId } = useParams();
  const { _id, isAuth } = useAppSelector((state) => state.user);

  const [data, setData] = React.useState<IPost | null>(null);

  React.useEffect(() => {
    async function fetchPostData() {
      setData(null);
      const { data } = await appAxios.get<IPost>(
        `http://localhost:4444/post/${postId}`
      );
      setData({
        ...data,
        likes: new Map(data.likes),
        dislikes: new Map(data.dislikes),
      });
    }
    fetchPostData();
  }, [postId]);

  const handleLike = async () => {
    if (!isAuth) return false;
    try {
      const { data } = await appAxios.patch(
        `http://localhost:4444/post/${postId}/like`
      );
      setData(
        (prev) =>
          prev && {
            ...prev,
            likes: new Map(data.likes),
            dislikes: new Map(data.dislikes),
          }
      );
    } catch (error) {
      console.error(error);
      alert('Ошибка при попытке лайкнуть пост...');
    }
  };

  const handleDislike = async () => {
    if (!isAuth) return false;
    try {
      const { data } = await appAxios.patch(
        `http://localhost:4444/post/${postId}/dislike`
      );
      setData(
        (prev) =>
          prev && {
            ...prev,
            likes: new Map(data.likes),
            dislikes: new Map(data.dislikes),
          }
      );
    } catch (error) {
      console.error(error);
      alert('Ошибка при попытке лайкнуть пост...');
    }
  };

  const handleFavorite = async () => {
    if (!isAuth) return false;
  };

  const handleCommentAdd = (comment: IComment) =>
    setData(
      (prev) => prev && { ...prev, comments: [...prev.comments, comment] }
    );

  const handleCommentRemove = (id: string) =>
    setData(
      (prev) =>
        prev && {
          ...prev,
          comments: prev.comments.filter((item) => item._id !== id),
        }
    );

  if (!data)
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div className={style.root}>
      <div className={style.container}>
        <div className={style.post}>
          {data.image && (
            <img
              src={`http://localhost:4444/uploads/${data.image}`}
              alt={data.title}
              className={style.postImage}
            />
          )}
          <div className={style.postBody}>
            <div className={style.postTop}>
              <Link
                to={`/users/${data.author._id}`}
                className={style.postAuthor}
              >
                {data.author.username}
              </Link>
              <p>{`${new Date(data.createdAt).toLocaleDateString()} ${new Date(
                data.createdAt
              ).toLocaleTimeString()}`}</p>
            </div>
            <h2 className={style.postTitle}>{data.title}</h2>
            <p className={style.postText}>{data.text}</p>
            <div className={style.postBottom}>
              <Button
                variant="text"
                onClick={handleLike}
                className={data.likes.has(_id) ? style.buttonActive : ''}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M4.2 6.59996L3.6936 6.27836L3.6 6.42476V6.59996H4.2ZM7.4376 1.51196L7.9428 1.83596L7.4376 1.51196ZM10.638 3.32396L10.1004 3.05636L10.638 3.32516V3.32396ZM9 6.59996L8.4636 6.33116C8.41776 6.42264 8.39608 6.52432 8.40061 6.62653C8.40514 6.72875 8.43573 6.82811 8.48949 6.91517C8.54324 7.00223 8.61836 7.0741 8.70771 7.12394C8.79707 7.17379 8.89768 7.19996 9 7.19996V6.59996ZM17.4 12.6L17.88 12.96L18 12.8004V12.6H17.4ZM14.52 16.44L15 16.8L14.52 16.44ZM9.9384 0.922763L10.2468 0.407963L9.9384 0.923963V0.922763ZM0 5.99996V18H1.2V5.99996H0ZM4.7064 6.92156L7.9428 1.83596L6.9312 1.19036L3.6936 6.27836L4.7064 6.92156V6.92156ZM10.1004 3.05756L8.4636 6.32996L9.5364 6.86756L11.1744 3.59156L10.1004 3.05516V3.05756ZM9 7.19996H15V5.99996H9V7.19996ZM16.8 8.99996V12.6H18V8.99996H16.8ZM16.92 12.24L14.04 16.08L15 16.8L17.88 12.96L16.92 12.24V12.24ZM12.6 16.8H6.6V18H12.6V16.8ZM4.8 15V6.59996H3.6V15H4.8ZM15 7.19996C15.4774 7.19996 15.9352 7.38961 16.2728 7.72717C16.6104 8.06474 16.8 8.52257 16.8 8.99996H18C18 8.20431 17.6839 7.44125 17.1213 6.87864C16.5587 6.31603 15.7957 5.99996 15 5.99996V7.19996ZM6.6 16.8C6.12261 16.8 5.66477 16.6103 5.32721 16.2728C4.98964 15.9352 4.8 15.4774 4.8 15H3.6C3.6 15.7956 3.91607 16.5587 4.47868 17.1213C5.04129 17.6839 5.80435 18 6.6 18V16.8ZM9.6288 1.43756C10.1856 1.77116 10.3908 2.47676 10.1004 3.05756L11.1744 3.59276C11.4495 3.04269 11.5067 2.40905 11.3348 1.81857C11.1628 1.2281 10.7742 0.724307 10.2468 0.407963L9.6288 1.43756ZM14.04 16.08C13.8723 16.3035 13.6549 16.485 13.405 16.6099C13.155 16.7349 12.8794 16.8 12.6 16.8V18C13.0657 18 13.5251 17.8915 13.9416 17.6832C14.3582 17.475 14.7206 17.1726 15 16.8L14.04 16.08ZM7.944 1.83596C8.304 1.26716 9.0528 1.09196 9.6288 1.43756L10.248 0.407963C9.70241 0.0804259 9.05048 -0.0210839 8.43113 0.125066C7.81178 0.271217 7.27401 0.65347 6.9324 1.19036L7.944 1.83476V1.83596Z"
                      fill="#727C85"
                    />
                  </g>
                </svg>
                {data.likes.size}
              </Button>
              <Button
                variant="text"
                onClick={handleDislike}
                className={data.dislikes.has(_id) ? style.buttonActive : ''}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M4.2 11.4H3.6V11.5752L3.6936 11.7216L4.2 11.4ZM7.4376 16.488L7.9428 16.164L7.4376 16.488ZM10.638 14.676L10.1004 14.9436L10.638 14.6748V14.676ZM9 11.4V10.8C8.89768 10.8 8.79707 10.8262 8.70771 10.876C8.61836 10.9259 8.54324 10.9977 8.48949 11.0848C8.43573 11.1719 8.40514 11.2712 8.40061 11.3734C8.39608 11.4756 8.41776 11.5773 8.4636 11.6688L9 11.4ZM17.4 5.4H18V5.1996L17.88 5.04L17.4 5.4ZM14.52 1.56L15 1.2L14.52 1.56ZM9.9384 17.0772L10.2468 17.592L9.9384 17.0772ZM1.2 12V0H0V12H1.2ZM3.6936 11.7216L6.9312 16.8096L7.9428 16.1652L4.7064 11.0772L3.6936 11.7216ZM11.1744 14.406L9.5364 11.1312L8.4636 11.6688L10.1004 14.9436L11.1744 14.4072V14.406ZM9 12H15V10.8H9V12ZM18 9V5.4H16.8V9H18ZM17.88 5.04L15 1.2L14.04 1.92L16.92 5.76L17.88 5.04V5.04ZM12.6 0H6.6V1.2H12.6V0ZM3.6 3V11.4H4.8V3H3.6ZM15 12C15.7957 12 16.5587 11.6839 17.1213 11.1213C17.6839 10.5587 18 9.79565 18 9H16.8C16.8 9.47739 16.6104 9.93523 16.2728 10.2728C15.9352 10.6104 15.4774 10.8 15 10.8V12ZM6.6 0C5.80435 0 5.04129 0.316071 4.47868 0.87868C3.91607 1.44129 3.6 2.20435 3.6 3H4.8C4.8 2.52261 4.98964 2.06477 5.32721 1.72721C5.66477 1.38964 6.12261 1.2 6.6 1.2V0ZM10.2468 17.592C10.7745 17.2756 11.1633 16.7716 11.3353 16.1809C11.5073 15.5901 11.4498 14.9562 11.1744 14.406L10.1004 14.9436C10.3908 15.5232 10.1844 16.2288 9.6288 16.5636L10.2468 17.592ZM15 1.2C14.7206 0.827412 14.3582 0.525002 13.9416 0.316718C13.5251 0.108435 13.0657 0 12.6 0V1.2C12.8794 1.2 13.155 1.26506 13.405 1.39003C13.6549 1.515 13.8723 1.69645 14.04 1.92L15 1.2ZM6.9312 16.8096C7.27281 17.3465 7.81058 17.7287 8.42993 17.8749C9.04928 18.021 9.70121 17.9195 10.2468 17.592L9.6288 16.5624C9.35147 16.7291 9.01998 16.7809 8.70502 16.7067C8.39006 16.6325 8.11655 16.4382 7.9428 16.1652L6.9312 16.8096V16.8096Z"
                      fill="#727C85"
                    />
                  </g>
                </svg>
                {data.dislikes.size}
              </Button>
              <button className={style.postFavorite} onClick={handleFavorite}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M9 16.2L8.5752 16.6248C8.63094 16.6806 8.69715 16.725 8.77004 16.7552C8.84293 16.7855 8.92108 16.801 9 16.801C9.07892 16.801 9.15707 16.7855 9.22996 16.7552C9.30285 16.725 9.36907 16.6806 9.4248 16.6248L9 16.2ZM1.8432 9.04315L1.4184 9.46675L1.8432 9.04315ZM7.8432 3.04315L7.4184 3.46675L7.8432 3.04315ZM9 4.19995L8.5752 4.62475C8.63094 4.68063 8.69715 4.72496 8.77004 4.75521C8.84293 4.78545 8.92108 4.80102 9 4.80102C9.07892 4.80102 9.15707 4.78545 9.22996 4.75521C9.30285 4.72496 9.36907 4.68063 9.4248 4.62475L9 4.19995ZM10.1568 3.04315L9.7332 2.61835L10.1568 3.04315ZM9.4248 15.7752L2.2668 8.61835L1.4184 9.46675L8.5752 16.6248L9.4248 15.7752V15.7752ZM15.7332 8.61835L8.5752 15.7752L9.4248 16.6248L16.5816 9.46675L15.7332 8.61835V8.61835ZM7.4184 3.46675L8.5752 4.62475L9.4248 3.77515L8.2668 2.61835L7.4184 3.46675V3.46675ZM9.4248 4.62475L10.5816 3.46675L9.7332 2.61835L8.5752 3.77515L9.4248 4.62475V4.62475ZM13.1568 1.19995C11.8728 1.19995 10.6416 1.70995 9.7332 2.61835L10.5816 3.46675C11.2647 2.78396 12.191 2.40026 13.1568 2.39995V1.19995ZM16.8 6.04315C16.8 7.00915 16.416 7.93555 15.732 8.61835L16.5816 9.46675C17.4896 8.55871 17.9998 7.32726 18 6.04315H16.8ZM18 6.04315C18 4.75865 17.4897 3.52677 16.5815 2.61849C15.6732 1.71022 14.4413 1.19995 13.1568 1.19995V2.39995C14.123 2.39995 15.0497 2.78379 15.7329 3.46702C16.4162 4.15025 16.8 5.07691 16.8 6.04315H18ZM4.8432 2.39995C5.8092 2.39995 6.7356 2.78395 7.4184 3.46795L8.2668 2.61835C7.35876 1.71039 6.12731 1.20019 4.8432 1.19995V2.39995ZM1.2 6.04315C1.2 5.07691 1.58384 4.15025 2.26707 3.46702C2.9503 2.78379 3.87696 2.39995 4.8432 2.39995V1.19995C3.5587 1.19995 2.32682 1.71022 1.41854 2.61849C0.510264 3.52677 0 4.75865 0 6.04315H1.2ZM2.268 8.61835C1.92959 8.28028 1.66109 7.87885 1.47784 7.43699C1.29459 6.99513 1.20018 6.5215 1.2 6.04315H0C0 7.32715 0.51 8.55835 1.4184 9.46675L2.2668 8.61835H2.268Z"
                      fill="#727C85"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={style.aside}>
          <h3>Комментарии</h3>
          {isAuth && (
            <WriteComment postId={data._id} addComment={handleCommentAdd} />
          )}
          <div className={style.asideBody}>
            {data.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                {...comment}
                onCommentRemove={handleCommentRemove}
                editable={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPostPage;
