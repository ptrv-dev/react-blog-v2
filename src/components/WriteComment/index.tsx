import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../UI/Button';

import style from './WriteComment.module.scss';

interface FormFields {
  text: string;
}

const WriteComment: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
  };

  return (
    <form className={style.root} onSubmit={handleSubmit(onSubmit)}>
      <textarea
        rows={5}
        {...register('text', { required: true, minLength: 4, maxLength: 512 })}
        className={style.input}
        placeholder="Ваш комментарий..."
      />
      <Button size="small" className={style.button}>
        Опубликовать
      </Button>
    </form>
  );
};

export default WriteComment;
