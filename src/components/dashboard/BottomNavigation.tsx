import React from 'react';
import { LayoutGrid, Scan, Clock, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { icon: LayoutGrid, label: 'Dashboard', id: 'dashboard' },
    { icon: Scan, label: 'Scan', id: 'scan' },
    { icon: Clock, label: 'History', id: 'history' },
    { icon: User, label: 'Profile', id: 'profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-t border-gray-700/30">
      <div className="flex items-center justify-around py-3 px-6 max-w-md mx-auto">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
              activeTab === item.id
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
            {activeTab === item.id && (
              <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;