import React from 'react';

import style from './Button.module.scss';

interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium';
  children: any;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  children,
}) => {
  const className = [style.button];
  size === 'small' && className.push(style.small);
  if (variant === 'outlined') className.push(style.outlined);
  else if (variant === 'text') className.push(style.text);

  return <button className={className.join(' ')}>{children}</button>;
};

export default Button;
