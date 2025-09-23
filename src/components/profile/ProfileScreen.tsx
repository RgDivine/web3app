import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Settings, 
  CreditCard, 
  Shield, 
  Moon, 
  Sun, 
  Bell, 
  LogOut,
  ChevronRight,
  Edit,
  Camera
} from 'lucide-react';
import StatusBar from '../StatusBar';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { User as UserType } from '../../types/crypto';

interface ProfileScreenProps {
  user: UserType;
  onBack: () => void;
  onEditProfile: () => void;
  onPaymentMethods: () => void;
  onSecurity: () => void;
  onNotifications: () => void;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onBack,
  onEditProfile,
  onPaymentMethods,
  onSecurity,
  onNotifications,
  onLogout
}) => {
  const [isDarkMode, setIsDarkMode] = useState(user.preferences.theme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd update the user preferences in the database
  };

  const menuItems = [
    {
      icon: User,
      label: 'Edit Profile',
      action: onEditProfile,
      description: 'Update your personal information'
    },
    {
      icon: CreditCard,
      label: 'Payment Methods',
      action: onPaymentMethods,
      description: 'Manage cards and bank accounts'
    },
    {
      icon: Shield,
      label: 'Security',
      action: onSecurity,
      description: '2FA, biometrics, and privacy settings'
    },
    {
      icon: Bell,
      label: 'Notifications',
      action: onNotifications,
      description: 'Push notifications and alerts'
    },
    {
      icon: Settings,
      label: 'Preferences',
      action: () => {},
      description: 'App settings and customization'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-semibold text-white">Profile</h1>
        <button 
          onClick={onEditProfile}
          className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors"
        >
          <Edit className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="px-6 space-y-6 pb-24">
        {/* Profile Header */}
        <Card className="p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/30">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-2xl">
                    {user.name.charAt(0)}
                  </span>
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-white font-bold text-xl">{user.name}</h2>
              <p className="text-gray-300">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Verified Account</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-white">₡183,863</div>
            <div className="text-gray-400 text-sm">Portfolio Value</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-gray-400 text-sm">Assets</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-white">47</div>
            <div className="text-gray-400 text-sm">Transactions</div>
          </Card>
        </div>

        {/* Theme Toggle */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDarkMode ? <Moon className="w-6 h-6 text-white" /> : <Sun className="w-6 h-6 text-white" />}
              <div>
                <h3 className="text-white font-semibold">Dark Mode</h3>
                <p className="text-gray-400 text-sm">Switch between light and dark themes</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isDarkMode ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  isDarkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full"
            >
              <Card className="p-4 hover:bg-gray-700/30 transition-all active:scale-98" hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-semibold">{item.label}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            </button>
          ))}
        </div>

        {/* App Info */}
        <Card className="p-4 bg-gray-800/50">
          <div className="text-center space-y-2">
            <h3 className="text-white font-semibold">CryptoTrade Pro</h3>
            <p className="text-gray-400 text-sm">Version 2.1.0</p>
            <p className="text-gray-400 text-xs">© 2024 CryptoTrade Pro. All rights reserved.</p>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="danger"
          className="w-full"
          size="lg"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfileScreen;