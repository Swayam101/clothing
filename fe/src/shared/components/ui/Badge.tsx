'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
}) => {
  const baseClasses = 'inline-flex items-center font-medium tracking-wide transition-all duration-300';

  const variantClasses = {
    default: 'bg-black text-white',
    outline: 'border border-gray-300 text-gray-700 hover:border-black hover:bg-black hover:text-white',
    subtle: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
