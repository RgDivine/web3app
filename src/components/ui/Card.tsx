import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = false
}) => {
  const baseClasses = 'bg-gray-800/30 backdrop-blur-md border border-gray-700/30 rounded-2xl transition-all duration-200';
  const hoverClasses = hover ? 'hover:bg-gray-700/30 hover:border-gray-600/50 hover:shadow-lg hover:shadow-purple-500/10' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;