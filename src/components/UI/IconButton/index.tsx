import React from 'react';

import style from './IconButton.module.scss';

interface IconButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium';
  children: any;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  children,
  className,
}) => {
  const customClasses = [style.iconButton, className];
  size === 'small' && customClasses.push(style.small);
  if (variant === 'outlined') customClasses.push(style.outlined);
  else if (variant === 'text') customClasses.push(style.text);

  return <button className={customClasses.join(' ')}>{children}</button>;
};

export default IconButton;
