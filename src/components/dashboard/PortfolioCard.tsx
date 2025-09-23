import React from 'react';
import { Plus, RefreshCw, Send } from 'lucide-react';
import Card from '../ui/Card';

interface PortfolioCardProps {
  balance: number;
  change24h: number;
  onBuy: () => void;
  onSwap: () => void;
  onSend: () => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  balance,
  change24h,
  onBuy,
  onSwap,
  onSend
}) => {
  const isPositive = change24h >= 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/30">
      <div className="mb-6">
        <p className="text-gray-300 text-sm mb-1">Current Balance</p>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-white">₡</span>
          <span className="text-4xl font-bold text-white ml-1">
            {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-2xl text-gray-400 ml-1">
            .97
          </span>
        </div>
        <div className={`text-sm mt-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '+' : ''}{change24h.toFixed(2)}% today
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={onBuy}
          className="flex flex-col items-center space-y-2 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-purple-600/30 flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Buy</span>
        </button>

        <button
          onClick={onSwap}
          className="flex flex-col items-center space-y-2 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-purple-600/30 flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Swap</span>
        </button>

        <button
          onClick={onSend}
          className="flex flex-col items-center space-y-2 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-purple-600/30 flex items-center justify-center">
            <Send className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Send</span>
        </button>
      </div>
    </Card>
  );
};

export default PortfolioCard;