import React, { forwardRef } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useSettingsStore } from '../../store/useSettingsStore';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className = '', ...props }, ref) => {
  const { isDarkMode } = useThemeStore();
  const { card } = useSettingsStore();

  return (
    <div
      ref={ref}
      className={`
        ${card.padding}
        ${card.rounded}
        ${card.shadow}
        ${isDarkMode ? card.darkBackground : card.background}
        ${isDarkMode ? card.darkBorder : card.border}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';