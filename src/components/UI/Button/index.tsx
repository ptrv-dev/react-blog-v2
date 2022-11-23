import React from 'react';
import { Link } from 'react-router-dom';

import style from './Button.module.scss';

interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium';
  children: any;
  href?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  children,
  href,
  className,
}) => {
  const customClass = [style.button];
  size === 'small' && customClass.push(style.small);
  if (variant === 'outlined') customClass.push(style.outlined);
  else if (variant === 'text') customClass.push(style.text);
  if (className) customClass.push(className);

  if (href)
    return (
      <Link to={href} className={customClass.join(' ')}>
        {children}
      </Link>
    );

  return <button className={customClass.join(' ')}>{children}</button>;
};

export default Button;
