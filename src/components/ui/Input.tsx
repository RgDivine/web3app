import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all ${Icon && iconPosition === 'left' ? 'pl-12' : ''} ${Icon && iconPosition === 'right' ? 'pr-12' : ''} ${className}`}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;