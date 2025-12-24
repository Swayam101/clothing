import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  message: string;
  showLink?: boolean;
  linkHref?: string;
  linkText?: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  showLink = false,
  linkHref = '/products',
  linkText = 'Browse Products',
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-gray-600 mb-4">{message}</p>
      {showLink && (
        <Link
          href={linkHref}
          className="inline-block text-sm tracking-wide underline underline-offset-4 hover:no-underline transition"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;

