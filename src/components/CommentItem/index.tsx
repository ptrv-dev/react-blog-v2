import React from 'react';

import { useAppSelector } from '../../redux/store';

import { IComment } from '../../@types/custom';

import style from './CommentItem.module.scss';
import { appAxios } from '../../App';

interface CommentItemProps extends IComment {
  onCommentRemove?: (id: string) => void;
  editable?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
  _id,
  author,
  text,
  likes,
  dislikes,
  onCommentRemove,
  editable = false,
}) => {
  const user = useAppSelector((state) => state.user);

  const [isMenuVisible, setIsMenuVisible] = React.useState<boolean>(false);
  const buttonMoreRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) =>
      !event.composedPath().includes(buttonMoreRef.current!) &&
      setIsMenuVisible(false);
    window.addEventListener('click', handleClickOutside);

    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLike = async () => {};
  const handleDislike = async () => {};

  const handleMoreMenu = () => setIsMenuVisible((prev) => !prev);
  const handleEdit = async () => {};
  const handleRemove = async () => {
    if (!window.confirm('Удалить комментарий?')) return false;

    await appAxios.delete(`/comment/${_id}`);

    onCommentRemove!(_id);
    alert('Комментарий удален!');
  };
  return (
    <div className={style.comment}>
      {editable && author._id === user._id && (
        <div
          className={`${style.more} ${isMenuVisible ? style.moreActive : ''}`}
          onClick={handleMoreMenu}
          ref={buttonMoreRef}
        >
          {isMenuVisible ? (
            <div className={style.moreMenu}>
              <button className={style.moreMenuItem} onClick={handleEdit}>
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                >
                  <path
                    d="M.5 10.5l-.354-.354-.146.147v.207h.5zm10-10l.354-.354a.5.5 0 00-.708 0L10.5.5zm4 4l.354.354a.5.5 0 000-.708L14.5 4.5zm-10 10v.5h.207l.147-.146L4.5 14.5zm-4 0H0a.5.5 0 00.5.5v-.5zm.354-3.646l10-10-.708-.708-10 10 .708.708zm9.292-10l4 4 .708-.708-4-4-.708.708zm4 3.292l-10 10 .708.708 10-10-.708-.708zM4.5 14h-4v1h4v-1zm-3.5.5v-4H0v4h1z"
                    fill="currentColor"
                  ></path>
                </svg>
                Изменить
              </button>
              <button className={style.moreMenuItem} onClick={handleRemove}>
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                >
                  <path
                    d="M4.5 3V1.5a1 1 0 011-1h4a1 1 0 011 1V3M0 3.5h15m-13.5 0v10a1 1 0 001 1h10a1 1 0 001-1v-10M7.5 7v5m-3-3v3m6-3v3"
                    stroke="currentColor"
                  ></path>
                </svg>
                Удалить
              </button>
            </div>
          ) : (
            <svg
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
            >
              <path
                d="M3 7.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 0a.5.5 0 11-1 0 .5.5 0 011 0zm5 0a.5.5 0 11-1 0 .5.5 0 011 0z"
                stroke="currentColor"
              ></path>
            </svg>
          )}
        </div>
      )}
      <div className={style.avatar}>
        {author.image ? (
          <img
            src={`http://localhost:4444/uploads/users/${author.image}`}
            alt={author.username}
          />
        ) : (
          <svg
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
          >
            <path
              clipRule="evenodd"
              d="M10.5 3.498a2.999 2.999 0 01-3 2.998 2.999 2.999 0 113-2.998zm2 10.992h-10v-1.996a3 3 0 013-3h4a3 3 0 013 3v1.997z"
              strokeLinecap="square"
            ></path>
          </svg>
        )}
      </div>
      <div className={style.column}>
        <h4>{author.username}</h4>
        <p>{text}</p>
        <div className={style.actions}>
          <button onClick={handleLike}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M3.73333 5.86669L3.2832 5.58082L3.2 5.71095V5.86669H3.73333ZM6.6112 1.34402L7.06027 1.63202L6.6112 1.34402ZM9.456 2.95469L8.97813 2.71682L9.456 2.95575V2.95469ZM8 5.86669L7.5232 5.62775C7.48246 5.70907 7.46318 5.79945 7.46721 5.8903C7.47124 5.98116 7.49843 6.06948 7.54621 6.14687C7.59399 6.22426 7.66076 6.28814 7.74019 6.33245C7.81961 6.37676 7.90905 6.40002 8 6.40002V5.86669ZM15.4667 11.2L15.8933 11.52L16 11.3782V11.2H15.4667ZM12.9067 14.6134L13.3333 14.9334L12.9067 14.6134ZM8.83413 0.820288L9.10827 0.362688L8.83413 0.821354V0.820288ZM0 5.33335V16H1.06667V5.33335H0ZM4.18347 6.15255L7.06027 1.63202L6.16107 1.05815L3.2832 5.58082L4.18347 6.15255V6.15255ZM8.97813 2.71789L7.5232 5.62669L8.4768 6.10455L9.9328 3.19255L8.97813 2.71575V2.71789ZM8 6.40002H13.3333V5.33335H8V6.40002ZM14.9333 8.00002V11.2H16V8.00002H14.9333ZM15.04 10.88L12.48 14.2934L13.3333 14.9334L15.8933 11.52L15.04 10.88V10.88ZM11.2 14.9334H5.86667V16H11.2V14.9334ZM4.26667 13.3334V5.86669H3.2V13.3334H4.26667ZM13.3333 6.40002C13.7577 6.40002 14.1646 6.56859 14.4647 6.86865C14.7648 7.16871 14.9333 7.57567 14.9333 8.00002H16C16 7.29278 15.719 6.6145 15.219 6.1144C14.7189 5.61431 14.0406 5.33335 13.3333 5.33335V6.40002ZM5.86667 14.9334C5.44232 14.9334 5.03535 14.7648 4.7353 14.4647C4.43524 14.1647 4.26667 13.7577 4.26667 13.3334H3.2C3.2 14.0406 3.48095 14.7189 3.98105 15.219C4.48115 15.7191 5.15942 16 5.86667 16V14.9334ZM8.55893 1.27789C9.05387 1.57442 9.23627 2.20162 8.97813 2.71789L9.9328 3.19362C10.1773 2.70467 10.2282 2.14143 10.0753 1.61656C9.92246 1.09169 9.57708 0.643883 9.10827 0.362688L8.55893 1.27789ZM12.48 14.2934C12.331 14.4921 12.1377 14.6534 11.9155 14.7644C11.6934 14.8755 11.4484 14.9334 11.2 14.9334V16C11.614 16 12.0223 15.9036 12.3926 15.7185C12.7629 15.5334 13.0849 15.2645 13.3333 14.9334L12.48 14.2934ZM7.06133 1.63202C7.38133 1.12642 8.04693 0.970688 8.55893 1.27789L9.10933 0.362688C8.62437 0.0715439 8.04487 -0.018687 7.49434 0.111224C6.94381 0.241136 6.46578 0.580916 6.16213 1.05815L7.06133 1.63095V1.63202Z"
                  fill="#727C85"
                />
              </g>
            </svg>
            {likes.length}
          </button>
          <button onClick={handleDislike}>
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M3.5 10H3V10.146L3.078 10.268L3.5 10ZM6.198 14.24L6.619 13.97L6.198 14.24ZM8.865 12.73L8.417 12.953L8.865 12.729V12.73ZM7.5 10V9.5C7.41474 9.5 7.33089 9.52181 7.25643 9.56335C7.18197 9.60489 7.11936 9.66478 7.07457 9.73733C7.02978 9.80988 7.00428 9.89268 7.00051 9.97786C6.99673 10.063 7.0148 10.1478 7.053 10.224L7.5 10ZM14.5 5H15V4.833L14.9 4.7L14.5 5ZM12.1 1.8L12.5 1.5L12.1 1.8ZM8.282 14.731L8.539 15.16L8.282 14.731ZM1 10.5V0.5H0V10.5H1ZM3.078 10.268L5.776 14.508L6.619 13.971L3.922 9.731L3.078 10.268ZM9.312 12.505L7.947 9.776L7.053 10.224L8.417 12.953L9.312 12.506V12.505ZM7.5 10.5H12.5V9.5H7.5V10.5ZM15 8V5H14V8H15ZM14.9 4.7L12.5 1.5L11.7 2.1L14.1 5.3L14.9 4.7V4.7ZM10.5 0.5H5.5V1.5H10.5V0.5ZM3 3V10H4V3H3ZM12.5 10.5C13.163 10.5 13.7989 10.2366 14.2678 9.76777C14.7366 9.29893 15 8.66304 15 8H14C14 8.39782 13.842 8.77936 13.5607 9.06066C13.2794 9.34196 12.8978 9.5 12.5 9.5V10.5ZM5.5 0.5C4.83696 0.5 4.20107 0.763392 3.73223 1.23223C3.26339 1.70107 3 2.33696 3 3H4C4 2.60218 4.15804 2.22064 4.43934 1.93934C4.72064 1.65804 5.10218 1.5 5.5 1.5V0.5ZM8.539 15.16C8.97877 14.8964 9.30274 14.4764 9.44607 13.9841C9.5894 13.4918 9.54152 12.9635 9.312 12.505L8.417 12.953C8.659 13.436 8.487 14.024 8.024 14.303L8.539 15.16ZM12.5 1.5C12.2671 1.18951 11.9652 0.937501 11.618 0.763932C11.2709 0.590363 10.8881 0.5 10.5 0.5V1.5C10.7329 1.5 10.9625 1.55422 11.1708 1.65836C11.3791 1.7625 11.5603 1.91371 11.7 2.1L12.5 1.5ZM5.776 14.508C6.06067 14.9554 6.50882 15.274 7.02494 15.3957C7.54106 15.5175 8.08434 15.4329 8.539 15.16L8.024 14.302C7.79289 14.4409 7.51665 14.4841 7.25419 14.4222C6.99172 14.3604 6.76379 14.1985 6.619 13.971L5.776 14.508V14.508Z"
                  fill="#727C85"
                />
              </g>
            </svg>
            {dislikes.length}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
