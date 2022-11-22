import React from 'react';

import style from './IconButton.module.scss';

interface IconButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium';
  children: any;
}

const IconButton: React.FC<IconButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  children,
}) => {
  const className = [style.iconButton];
  size === 'small' && className.push(style.small);
  if (variant === 'outlined') className.push(style.outlined);
  else if (variant === 'text') className.push(style.text);

  return <button className={className.join(' ')}>{children}</button>;
};

export default IconButton;
