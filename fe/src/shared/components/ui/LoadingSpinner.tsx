import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  size = 'md',
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <div
        className={`inline-block ${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-black border-r-transparent mb-4`}
        role="status"
        aria-label="Loading"
      />
      {message && <p className="text-gray-600">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;

