import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useSettingsStore } from '../../store/useSettingsStore';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ 
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const { isDarkMode } = useThemeStore();
  const { input } = useSettingsStore();

  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute left-3 top-2.5 text-gray-400">
          {leftIcon}
        </div>
      )}
      <input
        className={`
          ${input.base}
          ${isDarkMode ? input.dark : 'border-gray-200'}
          ${leftIcon ? 'pl-10' : ''}
          ${rightIcon ? 'pr-10' : ''}
          ${className}
        `}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3 top-2.5 text-gray-400">
          {rightIcon}
        </div>
      )}
    </div>
  );
};