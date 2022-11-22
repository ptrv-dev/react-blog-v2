import React from 'react';

import style from './Button.module.scss';

interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium';
  children: any;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  children,
  className,
}) => {
  const customClass = [style.button];
  size === 'small' && customClass.push(style.small);
  if (variant === 'outlined') customClass.push(style.outlined);
  else if (variant === 'text') customClass.push(style.text);
  if (className) customClass.push(className);

  return <button className={customClass.join(' ')}>{children}</button>;
};

export default Button;
