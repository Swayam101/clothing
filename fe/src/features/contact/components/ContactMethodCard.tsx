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
  const baseClasses = 'w-full py-3 text-sm tracking-wide transition-all duration-300 text-center cursor-pointer';
  
  const buttonClasses =`${baseClasses} border border-black bg-white text-black hover:bg-black hover:text-white block`;

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
        <button 
          onClick={onClick}
          style={{border:"1px solid black"}} 
          className={`border-none outline-none ${buttonClasses}`}
          type="button"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default ContactMethodCard;

