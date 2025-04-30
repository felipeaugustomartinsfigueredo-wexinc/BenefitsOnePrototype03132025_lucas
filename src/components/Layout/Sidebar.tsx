import React, { useState, useEffect } from 'react';
import { ChevronDown, Home, Heart, Users, ChevronLeft, ChevronRight, Palette, GitBranch, UserCog, Wallet, Settings as SettingsIcon, FileText, DollarSign } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  path: string;
  subItems?: { id: string; labelKey: string; path: string; }[];
  indicator?: boolean | number;
}

interface MenuCategory {
  id: string;
  labelKey?: string;
  items: MenuItem[];
}

// Count available modules from the mock data
const availableModules = 3; // Health Benefits, HSA Management, Theme Customization

const menuCategories: MenuCategory[] = [
  {
    id: 'home',
    items: [
      {
        id: 'home',
        labelKey: 'navigation.home.title',
        icon: <Home className="w-5 h-5" />,
        path: '/',
        indicator: 2, // Number of unread notifications
      },
    ],
  },
  {
    id: 'consumer',
    labelKey: 'navigation.categories.consumer',
    items: [
      {
        id: 'health',
        labelKey: 'navigation.benefits.title',
        icon: <Heart className="w-5 h-5" />,
        path: '/health',
        subItems: [
          { id: 'medical', labelKey: 'navigation.benefits.medical', path: '/health/medical' },
          { id: 'dental', labelKey: 'navigation.benefits.dental', path: '/health/dental' },
          { id: 'vision', labelKey: 'navigation.benefits.vision', path: '/health/vision' },
          { id: 'life', labelKey: 'navigation.benefits.lifeInsurance', path: '/health/life' },
          { id: 'disability', labelKey: 'navigation.benefits.disability', path: '/health/disability' },
        ],
      },
      {
        id: 'hsa',
        labelKey: 'navigation.hsa.title',
        icon: <Wallet className="w-5 h-5" />,
        path: '/hsa',
        subItems: [
          { id: 'account', labelKey: 'navigation.hsa.account', path: '/hsa/account' },
          { id: 'investments', labelKey: 'navigation.hsa.investments', path: '/hsa/investments' },
        ],
      },
      {
        id: 'claims',
        labelKey: 'navigation.hsa.claims',
        icon: <FileText className="w-5 h-5" />,
        path: '/hsa/claims',
      },
      {
        id: 'cobra',
        labelKey: 'navigation.cobra.title',
        icon: <DollarSign className="w-5 h-5" />,
        path: '/cobra',
        subItems: [
          { id: 'payments', labelKey: 'navigation.cobra.payments', path: '/cobra/payments' },
          { id: 'history', labelKey: 'navigation.cobra.history', path: '/cobra/history' },
          { id: 'documents', labelKey: 'navigation.cobra.documents', path: '/cobra/documents' },
        ],
      },
      {
        id: 'dependents',
        labelKey: 'navigation.dependents.title',
        icon: <Users className="w-5 h-5" />,
        path: '/dependents',
      },
    ],
  },
  {
    id: 'tools',
    labelKey: 'navigation.categories.tools',
    items: [
      {
        id: 'reports',
        labelKey: 'navigation.reports.title',
        icon: <FileText className="w-5 h-5" />,
        path: '/reports',
        subItems: [
          { id: 'available-reports', labelKey: 'navigation.reports.availableReports', path: '/reports/available' },
          { id: 'report-subscriptions', labelKey: 'navigation.reports.subscriptions', path: '/reports/subscriptions' },
        ],
      },
    ],
  },
  {
    id: 'administrative',
    labelKey: 'navigation.categories.administrative',
    items: [
      {
        id: 'plan-setup',
        labelKey: 'navigation.planSetup.title',
        icon: <SettingsIcon className="w-5 h-5" />,
        path: '/plan-setup',
        subItems: [
          { id: 'plans', labelKey: 'navigation.planSetup.plans', path: '/plan-setup/plans' },
        ],
      },
      {
        id: 'user-management',
        labelKey: 'navigation.userManagement.title',
        icon: <UserCog className="w-5 h-5" />,
        path: '/user-management',
        subItems: [
          { id: 'users', labelKey: 'navigation.userManagement.users', path: '/user-management/users' },
          { id: 'roles', labelKey: 'navigation.userManagement.roles', path: '/user-management/roles' },
        ],
      },
    ],
  },
  {
    id: 'portal-settings',
    labelKey: 'navigation.categories.portalSettings',
    items: [
      {
        id: 'theme',
        labelKey: 'navigation.theme.title',
        icon: <Palette className="w-5 h-5" />,
        path: '/theme',
        subItems: [
          { id: 'colors', labelKey: 'navigation.theme.colors', path: '/theme/colors' },
          { id: 'typography', labelKey: 'navigation.theme.typography', path: '/theme/typography' },
          { id: 'logo', labelKey: 'navigation.theme.logo', path: '/theme/logo' },
        ],
      },
      {
        id: 'releases',
        labelKey: 'navigation.releases.title',
        icon: <GitBranch className="w-5 h-5" />,
        path: '/releases',
        indicator: availableModules, // Show number of available modules
      },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const { theme, isNavCollapsed, toggleNav, isDarkMode } = useThemeStore();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['home']);
  const { t } = useTranslation();

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isMobile = window.innerWidth < 768;
      const isMenuButton = target.closest('[data-menu-button]');
      
      if (isMobile && !isNavCollapsed && !isMenuButton) {
        const sidebar = document.querySelector('[data-sidebar]');
        if (sidebar && !sidebar.contains(target)) {
          toggleNav();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNavCollapsed, toggleNav]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && !isNavCollapsed) {
      toggleNav();
    }
  }, [location.pathname]);

  const toggleExpand = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isItemActive = (item: MenuItem) => {
    if (location.pathname === item.path) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => location.pathname === subItem.path);
    }
    return false;
  };

  return (
    <div className="relative">
      <nav 
        data-sidebar
        className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} 
          border-r fixed h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 top-16 
          ${isNavCollapsed ? '-translate-x-full md:translate-x-0 w-0 md:w-20' : 'translate-x-0 w-64'} 
          z-[60]`}
      >
        <div className="py-2">
          {menuCategories.map((category, index) => (
            <React.Fragment key={category.id}>
              {index > 0 && (
                <div 
                  className={`mx-2 my-2 border-t ${
                    isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
                  }`}
                />
              )}
              <div className="mb-2">
                {!isNavCollapsed && category.labelKey && (
                  <h2 className={`px-4 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                    isDarkMode ? 'text-gray-400 bg-gray-800/50' : 'text-gray-500 bg-gray-50/50'
                  }`}>
                    {t(category.labelKey)}
                  </h2>
                )}
                {category.items.map((item) => (
                  <div key={item.id} className="mb-0.5 px-2">
                    <div
                      className={`flex items-center justify-between rounded-lg transition-all duration-200 group cursor-pointer ${
                        isItemActive(item)
                          ? isDarkMode
                            ? 'bg-teal-900/30 text-teal-400'
                            : 'bg-teal-50 text-teal-700'
                          : isDarkMode
                            ? 'hover:bg-gray-700/50 text-gray-300'
                            : 'hover:bg-gray-50 text-gray-700'
                      }`}
                      onClick={(e) => item.subItems ? toggleExpand(e, item.id) : undefined}
                    >
                      <Link
                        to={item.path}
                        className="flex items-center gap-3 flex-1 px-2 py-1.5"
                        onClick={(e) => item.subItems && e.preventDefault()}
                      >
                        <div className="relative flex items-center justify-center w-6 h-6">
                          {item.icon}
                          {typeof item.indicator === 'number' ? (
                            <span 
                              className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs rounded-full bg-red-500 text-white"
                              title={item.id === 'releases' 
                                ? `${item.indicator} modules ready for activation`
                                : `${item.indicator} unread notifications`
                              }
                            >
                              {item.indicator}
                            </span>
                          ) : item.indicator && (
                            <span 
                              className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"
                              title="New versions available"
                            />
                          )}
                        </div>
                        {!isNavCollapsed && (
                          <span className="text-sm truncate">{t(item.labelKey)}</span>
                        )}
                      </Link>
                      {!isNavCollapsed && item.subItems && (
                        <button 
                          className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5"
                          onClick={(e) => toggleExpand(e, item.id)}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              expandedItems.includes(item.id) ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    
                    {!isNavCollapsed && item.subItems && expandedItems.includes(item.id) && (
                      <div className="ml-4 mt-0.5 space-y-0.5">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.id}
                            to={subItem.path}
                            className={`block px-4 py-1.5 rounded-md text-sm transition-colors duration-200 ${
                              location.pathname === subItem.path
                                ? isDarkMode
                                  ? 'text-teal-400 bg-teal-900/30'
                                  : 'text-teal-700 bg-teal-50'
                                : isDarkMode
                                  ? 'text-gray-400 hover:bg-gray-700/50'
                                  : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {t(subItem.labelKey)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </nav>
      
      <button
        onClick={toggleNav}
        className={`fixed top-1/2 transform -translate-y-1/2 z-50 hidden md:flex ${
          isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-100 hover:bg-gray-50'
        } rounded-full p-2 shadow-sm border transition-all duration-300`}
        style={{ 
          color: theme.colors.primary.navy,
          left: isNavCollapsed ? '4.5rem' : '15.5rem'
        }}
      >
        {isNavCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Mobile overlay */}
      {!isNavCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={toggleNav}
        />
      )}
    </div>
  );
};