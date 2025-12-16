import React from 'react';

interface ContactMethodCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  onClick?: () => void;
  buttonVariant?: 'primary' | 'secondary';
}

const ContactMethodCard: React.FC<ContactMethodCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  buttonHref,
  onClick,
  buttonVariant = 'primary',
}) => {
  const buttonClasses =
    buttonVariant === 'primary'
      ? 'w-full py-3 bg-black text-white text-sm tracking-wide hover:bg-gray-900 transition-all duration-300'
      : 'block w-full py-3 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-300';

  return (
    <div className="border border-gray-200 p-8 text-center hover:border-black transition-colors">
      {/* Icon */}
      <div className="w-16 h-16 border border-gray-300 flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-sm tracking-widest font-medium mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-6">{description}</p>

      {/* Button */}
      {buttonHref ? (
        <a
          href={buttonHref}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
        >
          {buttonText}
        </a>
      ) : (
        <button onClick={onClick} className={buttonClasses}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default ContactMethodCard;

