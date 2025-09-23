import React, { useState } from 'react';
import { ArrowLeft, Bell, ArrowUpDown, Search } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import StatusBar from '../StatusBar';

interface SendScreenProps {
  onBack: () => void;
}

const SendScreen: React.FC<SendScreenProps> = ({ onBack }) => {
  const [recipient, setRecipient] = useState('michaeluiux.sol');
  const [amount, setAmount] = useState('0.00001');
  const [usdAmount, setUsdAmount] = useState('0.01');
  const [selectedAsset, setSelectedAsset] = useState('SOL');

  const assets = [
    { symbol: 'SOL', name: 'Solana', balance: 0.0042, icon: '◎', gradient: 'from-purple-600 to-blue-600' },
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.0012, icon: '₿', gradient: 'from-orange-600 to-yellow-600' },
    { symbol: 'ETH', name: 'Ethereum', balance: 0.15, icon: 'Ξ', gradient: 'from-blue-600 to-purple-600' }
  ];

  const selectedAssetData = assets.find(a => a.symbol === selectedAsset) || assets[0];
  const estimatedFee = '0.28 SOL';
  const processingTime = '$1.64-15 sec';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-semibold text-white">Send</h1>
        <button className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors">
          <Bell className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="px-6 space-y-6">
        {/* Recipient */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">To:</label>
          <div className="relative">
            <Input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="pr-12 text-blue-400"
              placeholder="Enter recipient address"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
              <Search className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Asset Selection */}
        <Card className={`p-4 bg-gradient-to-r ${selectedAssetData.gradient}/20 border-purple-500/30`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${selectedAssetData.gradient} flex items-center justify-center text-white font-bold text-xl`}>
                {selectedAssetData.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">{selectedAssetData.name}</h3>
                <p className="text-gray-300 text-sm">
                  {selectedAssetData.balance.toFixed(4)} {selectedAssetData.symbol} available
                </p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-white rotate-180" />
          </div>
        </Card>

        {/* Amount Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${selectedAssetData.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                {selectedAssetData.icon}
              </div>
              <span className="text-white font-medium">{selectedAsset}</span>
              <span className="text-gray-400">Max</span>
            </div>
            <div className="text-right">
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-right bg-transparent border-none text-2xl font-bold p-0 w-32"
                placeholder="0.00000"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
              <ArrowUpDown className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">$</span>
              <span className="text-white font-medium">USD</span>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-90" />
            </div>
            <div className="text-right">
              <Input
                value={usdAmount}
                onChange={(e) => setUsdAmount(e.target.value)}
                className="text-right bg-transparent border-none text-xl font-semibold p-0 w-24"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Review Button */}
        <Button className="w-full" size="lg">
          <Search className="w-5 h-5 mr-2" />
          Review
        </Button>

        {/* Transaction Details */}
        <Card className="p-4 bg-gray-800/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">≡</span>
              </div>
              <span className="text-white font-medium">{processingTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Normal</span>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-90" />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Estimated fee</span>
            <span className="text-white font-medium">{estimatedFee}</span>
          </div>
        </Card>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pt-8 pb-4">
        <div className="w-32 h-1 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default SendScreen;