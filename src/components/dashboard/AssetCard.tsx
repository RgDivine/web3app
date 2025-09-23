import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../ui/Card';
import { CryptoAsset } from '../../types/crypto';

interface AssetCardProps {
  asset: CryptoAsset;
  onClick: () => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onClick }) => {
  const isPositive = asset.change24h >= 0;

  const getAssetIcon = (symbol: string) => {
    const icons: { [key: string]: string } = {
      BTC: '₿',
      ETH: 'Ξ',
      SOL: '◎',
      ADA: '₳',
      DOT: '●'
    };
    return icons[symbol] || '●';
  };

  return (
    <Card className="p-4" hover onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
            {getAssetIcon(asset.symbol)}
          </div>
          <div>
            <h3 className="text-white font-semibold">{asset.name}</h3>
            <p className="text-gray-400 text-sm">
              {asset.balance.toFixed(6)} {asset.symbol} available
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white font-semibold">
            ₡{asset.valueUsd.toFixed(2)}
          </p>
          <div className={`flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AssetCard;