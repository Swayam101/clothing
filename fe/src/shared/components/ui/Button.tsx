import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 text-sm tracking-wide transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-900',
    secondary: 'border border-black hover:bg-black hover:text-white',
    outline: 'underline underline-offset-4 hover:no-underline',
  };
  
  const sizeClasses = {
    sm: 'px-6 py-3 ',
    md: 'px-8 py-4 ',
    lg: 'px-10 py-5',
  };
  
  const disabledClasses = disabled 
    ? 'bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200' 
    : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
};

export default Button;

