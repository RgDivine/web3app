import React, { useState } from 'react';
import AuthScreen from './components/auth/AuthScreen';
import SignInScreen from './components/auth/SignInScreen';
import SignUpScreen from './components/auth/SignUpScreen';
import Dashboard from './components/dashboard/Dashboard';
import SendScreen from './components/trading/SendScreen';
import BuyScreen from './components/trading/BuyScreen';
import PaymentOptionsScreen from './components/trading/PaymentOptionsScreen';
import ScanScreen from './components/scanner/ScanScreen';
import ProfileScreen from './components/profile/ProfileScreen';
import NotificationsScreen from './components/notifications/NotificationsScreen';
import { User } from './types/crypto';

type Screen = 
  | 'auth' 
  | 'signin' 
  | 'signup' 
  | 'dashboard' 
  | 'send' 
  | 'buy' 
  | 'payment' 
  | 'scan' 
  | 'profile' 
  | 'notifications';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleAuth = (userData: User) => {
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  const handleSignIn = () => {
    setCurrentScreen('signin');
  };

  const handleSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleBackToAuth = () => {
    setCurrentScreen('auth');
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log('Forgot password');
  };

  const handleBuy = () => {
    setCurrentScreen('buy');
  };

  const handleSwap = () => {
    // Handle swap functionality
    console.log('Swap clicked');
  };

  const handleSend = () => {
    setCurrentScreen('send');
  };

  const handlePaymentOptions = () => {
    setCurrentScreen('payment');
  };

  const handleNotifications = () => {
    setCurrentScreen('notifications');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    switch (tab) {
      case 'dashboard':
        setCurrentScreen('dashboard');
        break;
      case 'scan':
        setCurrentScreen('scan');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
      case 'history':
        // Handle history tab
        console.log('History tab');
        break;
    }
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setActiveTab('dashboard');
  };

  const handleSelectCrypto = (crypto: any) => {
    console.log('Selected crypto:', crypto);
    // Handle crypto selection for buying
  };

  const handleSelectPaymentMethod = (method: any) => {
    console.log('Selected payment method:', method);
    // Handle payment method selection
  };

  const handleAddPaymentMethod = () => {
    console.log('Add payment method');
    // Handle adding new payment method
  };

  const handleScanResult = (result: string) => {
    console.log('Scan result:', result);
    // Handle QR scan result
    setCurrentScreen('send'); // Navigate to send screen with scanned address
  };

  const handleLogout = () => {
    setUser(mockUser);
    setCurrentScreen('auth');
    setActiveTab('dashboard');
  };

  const handleEditProfile = () => {
    console.log('Edit profile');
  };

  const handleSecurity = () => {
    console.log('Security settings');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 min-h-screen">
      {currentScreen === 'auth' && (
        <AuthScreen onSignIn={handleSignIn} onSignUp={handleSignUp} />
      )}
      
      {currentScreen === 'signin' && (
        <SignInScreen 
          onSignIn={handleAuth} 
          onBack={handleBackToAuth}
          onForgotPassword={handleForgotPassword}
        />
      )}
      
      {currentScreen === 'signup' && (
        <SignUpScreen 
          onSignUp={handleAuth} 
          onBack={handleBackToAuth}
        />
      )}
      
      {currentScreen === 'dashboard' && user && (
        <Dashboard 
          user={user} 
          onBuy={handleBuy}
          onSwap={handleSwap}
          onSend={handleSend}
          onNotifications={handleNotifications}
          onTabChange={handleTabChange}
          activeTab={activeTab}
        />
      )}
      
      {currentScreen === 'send' && (
        <SendScreen onBack={handleBackToDashboard} />
      )}
      
      {currentScreen === 'buy' && (
        <BuyScreen 
          onBack={handleBackToDashboard}
          onSelectCrypto={handleSelectCrypto}
          onPaymentOptions={handlePaymentOptions}
        />
      )}
      
      {currentScreen === 'payment' && (
        <PaymentOptionsScreen
          onBack={() => setCurrentScreen('buy')}
          onSelectPaymentMethod={handleSelectPaymentMethod}
          onAddPaymentMethod={handleAddPaymentMethod}
        />
      )}
      
      {currentScreen === 'scan' && (
        <ScanScreen
          onBack={handleBackToDashboard}
          onScanResult={handleScanResult}
        />
      )}
      
      {currentScreen === 'profile' && user && (
        <ProfileScreen
          user={user}
          onBack={handleBackToDashboard}
          onEditProfile={handleEditProfile}
          onPaymentMethods={handlePaymentOptions}
          onSecurity={handleSecurity}
          onNotifications={handleNotifications}
          onLogout={handleLogout}
        />
      )}
      
      {currentScreen === 'notifications' && (
        <NotificationsScreen onBack={handleBackToDashboard} />
      )}
    </div>
  );
}

export default App;