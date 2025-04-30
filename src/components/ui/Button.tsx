import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useSettingsStore } from '../../store/useSettingsStore';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  icon,
  children,
  className = '',
  ...props
}) => {
  const { theme } = useThemeStore();
  const { button } = useSettingsStore();

  return (
    <button
      className={`
        ${button.base}
        ${variant === 'primary' ? button.primary : button.secondary}
        ${className}
      `}
      style={variant === 'primary' ? { backgroundColor: theme.colors.primary.teal } : undefined}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};