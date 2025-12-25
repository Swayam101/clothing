import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  disabled = false,
  maxLength,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      maxLength={maxLength}
      className={`px-6 py-4 border border-gray-300 focus:outline-none focus:border-black transition text-sm disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${className}`}
    />
  );
};

export default Input;

