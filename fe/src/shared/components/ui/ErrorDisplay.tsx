import React from 'react';
import Link from 'next/link';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  showBackLink?: boolean;
  backLinkHref?: string;
  backLinkText?: string;
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = 'Something went wrong',
  message,
  showBackLink = true,
  backLinkHref = '/products',
  backLinkText = 'Go Back',
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-3xl font-light mb-4 text-red-600">{title}</h2>
      {message && <p className="text-gray-600 mb-6">{message}</p>}
      {showBackLink && (
        <Link
          href={backLinkHref}
          className="inline-block text-sm tracking-wide underline underline-offset-4 hover:no-underline transition"
        >
          {backLinkText}
        </Link>
      )}
    </div>
  );
};

export default ErrorDisplay;

