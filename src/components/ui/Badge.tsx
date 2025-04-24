import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useSettingsStore } from '../../store/useSettingsStore';

interface BadgeProps {
  variant: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  variant,
  children,
  icon,
  className = '',
}) => {
  const { isDarkMode } = useThemeStore();
  const { badge } = useSettingsStore();

  const getVariantClass = () => {
    if (isDarkMode) {
      switch (variant) {
        case 'success': return badge.darkSuccess;
        case 'warning': return badge.darkWarning;
        case 'error': return badge.darkError;
        case 'info': return badge.darkInfo;
      }
    } else {
      switch (variant) {
        case 'success': return badge.success;
        case 'warning': return badge.warning;
        case 'error': return badge.error;
        case 'info': return badge.info;
      }
    }
  };

  return (
    <span className={`${badge.base} ${getVariantClass()} ${className}`}>
      {icon}
      {children}
    </span>
  );
};