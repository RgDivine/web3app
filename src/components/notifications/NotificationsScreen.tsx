import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, TrendingUp, Send, Shield, Settings } from 'lucide-react';
import StatusBar from '../StatusBar';
import Card from '../ui/Card';
import { Notification } from '../../types/crypto';

interface NotificationsScreenProps {
  onBack: () => void;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Mock notifications data
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Price Alert',
        message: 'Bitcoin has reached $45,000! Your target price has been hit.',
        type: 'success',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false
      },
      {
        id: '2',
        title: 'Transaction Completed',
        message: 'Your purchase of 0.001 BTC has been completed successfully.',
        type: 'success',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false
      },
      {
        id: '3',
        title: 'Security Alert',
        message: 'New device login detected from Chrome on Windows.',
        type: 'warning',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: true
      },
      {
        id: '4',
        title: 'Market Update',
        message: 'Ethereum is up 5.2% in the last 24 hours.',
        type: 'info',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        read: true
      },
      {
        id: '5',
        title: 'Payment Failed',
        message: 'Your card ending in 4242 was declined. Please update your payment method.',
        type: 'error',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <Shield className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <Bell className="w-5 h-5 text-red-400" />;
      case 'info':
      default:
        return <Bell className="w-5 h-5 text-blue-400" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-500/30 bg-green-500/10';
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'error':
        return 'border-red-500/30 bg-red-500/10';
      case 'info':
      default:
        return 'border-blue-500/30 bg-blue-500/10';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-white">Notifications</h1>
          {unreadCount > 0 && (
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{unreadCount}</span>
            </div>
          )}
        </div>
        <button 
          onClick={markAllAsRead}
          className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors"
        >
          <Settings className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="px-6 space-y-4 pb-24">
        {unreadCount > 0 && (
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">{unreadCount} unread notifications</p>
            <button
              onClick={markAllAsRead}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium"
            >
              Mark all as read
            </button>
          </div>
        )}

        {notifications.length === 0 ? (
          <Card className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">No Notifications</h3>
            <p className="text-gray-400">You're all caught up! New notifications will appear here.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className="w-full text-left"
              >
                <Card 
                  className={`p-4 transition-all hover:bg-gray-700/30 ${
                    !notification.read ? 'border-purple-500/50 bg-purple-500/10' : ''
                  } ${getNotificationColor(notification.type)}`}
                  hover
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <span className="text-gray-400 text-xs flex-shrink-0">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      <p className={`text-sm ${!notification.read ? 'text-gray-300' : 'text-gray-400'}`}>
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        )}

        {/* Notification Settings */}
        <Card className="p-4 bg-gray-800/50">
          <h3 className="text-white font-semibold mb-3">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Price Alerts</span>
              <div className="w-10 h-6 bg-purple-600 rounded-full relative">
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Transaction Updates</span>
              <div className="w-10 h-6 bg-purple-600 rounded-full relative">
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Security Alerts</span>
              <div className="w-10 h-6 bg-purple-600 rounded-full relative">
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Market News</span>
              <div className="w-10 h-6 bg-gray-600 rounded-full relative">
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsScreen;