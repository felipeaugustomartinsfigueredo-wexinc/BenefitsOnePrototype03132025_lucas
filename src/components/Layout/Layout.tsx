import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useThemeStore } from '../../store/useThemeStore';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isNavCollapsed, isDarkMode } = useThemeStore();
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className={`flex-1 p-4 md:p-8 transition-all duration-300 ${
          isNavCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'
        }`}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};