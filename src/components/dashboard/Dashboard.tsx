import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import StatusBar from '../StatusBar';
import PortfolioCard from './PortfolioCard';
import WalletAddress from './WalletAddress';
import AssetCard from './AssetCard';
import LiveChart from '../charts/LiveChart';
import BottomNavigation from './BottomNavigation';
import Card from '../ui/Card';
import { CryptoAsset, User } from '../../types/crypto';

interface DashboardProps {
  user: User;
  onBuy: () => void;
  onSwap: () => void;
  onSend: () => void;
  onNotifications: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  onBuy, 
  onSwap, 
  onSend, 
  onNotifications, 
  onTabChange, 
  activeTab 
}) => {
  const [selectedCrypto, setSelectedCrypto] = React.useState('solana');
  const [showCryptoDropdown, setShowCryptoDropdown] = React.useState(false);

  const mockAssets: CryptoAsset[] = [
    {
      id: '1',
      symbol: 'SOL',
      name: 'Solana',
      price: 1863.97,
      change24h: 0.68,
      balance: 0.0042,
      valueUsd: 1863.97
    },
    {
      id: '2',
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 45234.56,
      change24h: -2.34,
      balance: 0.0012,
      valueUsd: 54.28
    },
    {
      id: '3',
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2834.12,
      change24h: 1.45,
      balance: 0.15,
      valueUsd: 425.12
    }
  ];

  const totalBalance = 183863.97;
  const totalChange24h = 0.68;

  const cryptoOptions = [
    { id: 'solana', name: 'Solana', symbol: 'SOL', icon: '◎' },
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', icon: '₿' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', icon: '₳' }
  ];

  const selectedCryptoData = cryptoOptions.find(c => c.id === selectedCrypto) || cryptoOptions[0];

  const handleAssetClick = (asset: CryptoAsset) => {
    console.log('Asset clicked:', asset);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {user.name.charAt(0)}
            </span>
          </div>
          <span className="text-white font-semibold text-lg">{user.name}</span>
        </div>
        <button 
          onClick={onNotifications}
          className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors relative"
        >
          <Bell className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>
      </div>

      <div className="px-6 space-y-6">
        {/* Portfolio Overview */}
        <PortfolioCard
          balance={totalBalance}
          change24h={totalChange24h}
          onBuy={onBuy}
          onSwap={onSwap}
          onSend={onSend}
        />

        {/* Wallet Address */}
        <WalletAddress
          address={user.walletAddress}
          onSend={onSend}
        />

        {/* Crypto Selector and Live Chart */}
        <div className="space-y-4">
          <div className="relative">
            <button
              onClick={() => setShowCryptoDropdown(!showCryptoDropdown)}
              className="w-full"
            >
              <Card className="p-4 hover:bg-gray-700/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {selectedCryptoData.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-semibold">{selectedCryptoData.name}</h3>
                      <p className="text-gray-400 text-sm">{selectedCryptoData.symbol}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-white transition-transform ${showCryptoDropdown ? 'rotate-180' : ''}`} />
                </div>
              </Card>
            </button>

            {showCryptoDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 z-10">
                <Card className="p-2">
                  {cryptoOptions.map((crypto) => (
                    <button
                      key={crypto.id}
                      onClick={() => {
                        setSelectedCrypto(crypto.id);
                        setShowCryptoDropdown(false);
                      }}
                      className={`w-full p-3 rounded-xl text-left hover:bg-gray-700/50 transition-all ${
                        selectedCrypto === crypto.id ? 'bg-purple-600/20' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{crypto.icon}</span>
                        <div>
                          <div className="text-white font-medium">{crypto.name}</div>
                          <div className="text-gray-400 text-sm">{crypto.symbol}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </Card>
              </div>
            )}
          </div>

          {/* Live Chart */}
          <Card className="p-4">
            <div className="mb-4">
              <h3 className="text-white font-semibold text-lg">{selectedCryptoData.name} Price</h3>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-2xl font-bold text-white">
                  ${mockAssets.find(a => a.symbol === selectedCryptoData.symbol)?.price.toFixed(2) || '0.00'}
                </span>
                <span className="text-green-400 text-sm">+0.68%</span>
              </div>
            </div>
            <LiveChart
              symbol={selectedCryptoData.symbol}
              coinId={selectedCrypto}
              period="24h"
            />
          </Card>
        </div>
        {/* Other Assets */}
        <div className="space-y-3">
          {mockAssets.slice(1).map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onClick={() => handleAssetClick(asset)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />

      {/* Bottom indicator */}
      <div className="flex justify-center pt-4 pb-4">
        <div className="w-32 h-1 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default Dashboard;