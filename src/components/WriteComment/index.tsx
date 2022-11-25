import React from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IComment } from '../../@types/custom';

import Button from '../UI/Button';

import style from './WriteComment.module.scss';

interface WriteCommentProps {
  postId: string;
  addComment: (comment: IComment) => void;
}

interface FormFields {
  text: string;
}

const WriteComment: React.FC<WriteCommentProps> = ({ postId, addComment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const { data: newComment } = await axios.post(
        'http://localhost:4444/comment',
        { post: postId, text: data.text },
        { withCredentials: true }
      );
      reset();
      addComment(newComment);
    } catch (error) {
      console.error(error);
      alert('Ошибка при публикации комментария...');
    }
  };

  return (
    <form className={style.root} onSubmit={handleSubmit(onSubmit)}>
      <textarea
        rows={5}
        {...register('text', { required: true, minLength: 2, maxLength: 1024 })}
        className={`${style.input} ${errors.text ? style.inputError : ''}`}
        placeholder="Ваш комментарий..."
      />
      <Button size="small" className={style.button}>
        Опубликовать
      </Button>
    </form>
  );
};

export default WriteComment;
