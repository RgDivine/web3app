import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, TrendingUp, TrendingDown } from 'lucide-react';
import StatusBar from '../StatusBar';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import { CryptoAsset } from '../../types/crypto';
import { CryptoApiService } from '../../services/cryptoApi';

interface BuyScreenProps {
  onBack: () => void;
  onSelectCrypto: (crypto: CryptoAsset) => void;
  onPaymentOptions: () => void;
}

const BuyScreen: React.FC<BuyScreenProps> = ({ onBack, onSelectCrypto, onPaymentOptions }) => {
  const [cryptos, setCryptos] = useState<CryptoAsset[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<CryptoAsset[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCryptos();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = cryptos.filter(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCryptos(filtered);
    } else {
      setFilteredCryptos(cryptos);
    }
  }, [searchQuery, cryptos]);

  const loadCryptos = async () => {
    try {
      setLoading(true);
      const data = await CryptoApiService.getTopCryptos(50);
      setCryptos(data);
      setFilteredCryptos(data);
    } catch (error) {
      console.error('Error loading cryptos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCryptoIcon = (symbol: string) => {
    const icons: { [key: string]: string } = {
      BTC: '₿',
      ETH: 'Ξ',
      SOL: '◎',
      ADA: '₳',
      DOT: '●',
      MATIC: '⬟',
      AVAX: '▲',
      LINK: '🔗',
      UNI: '🦄',
      LTC: 'Ł'
    };
    return icons[symbol] || '●';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-semibold text-white">Buy Crypto</h1>
        <Button
          onClick={onPaymentOptions}
          variant="secondary"
          size="sm"
        >
          Payment
        </Button>
      </div>

      <div className="px-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
            className="pl-12"
          />
        </div>

        {/* Top Gainers */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">Top Gainers</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {filteredCryptos
              .filter(crypto => crypto.change24h > 0)
              .slice(0, 5)
              .map((crypto) => (
                <button
                  key={crypto.id}
                  onClick={() => onSelectCrypto(crypto)}
                  className="flex-shrink-0 p-3 bg-green-500/20 border border-green-500/30 rounded-xl min-w-[120px] hover:bg-green-500/30 transition-all active:scale-95"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{getCryptoIcon(crypto.symbol)}</div>
                    <div className="text-white font-medium text-sm">{crypto.symbol}</div>
                    <div className="text-green-400 text-xs">+{crypto.change24h.toFixed(2)}%</div>
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* All Cryptocurrencies */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">All Cryptocurrencies</h2>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <Card className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-16"></div>
                      </div>
                      <div className="text-right">
                        <div className="h-4 bg-gray-700 rounded w-20 mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-12"></div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 pb-24">
              {filteredCryptos.map((crypto) => {
                const isPositive = crypto.change24h >= 0;
                return (
                  <button
                    key={crypto.id}
                    onClick={() => onSelectCrypto(crypto)}
                    className="w-full"
                  >
                    <Card className="p-4 hover:bg-gray-700/30 transition-all active:scale-98" hover>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                            {crypto.image ? (
                              <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                            ) : (
                              getCryptoIcon(crypto.symbol)
                            )}
                          </div>
                          <div className="text-left">
                            <h3 className="text-white font-semibold">{crypto.name}</h3>
                            <div className="flex items-center space-x-2">
                              <p className="text-gray-400 text-sm">{crypto.symbol}</p>
                              {crypto.rank && (
                                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                  #{crypto.rank}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">
                            ${crypto.price.toLocaleString('en-US', { 
                              minimumFractionDigits: 2, 
                              maximumFractionDigits: crypto.price < 1 ? 6 : 2 
                            })}
                          </p>
                          <div className={`flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                            {isPositive ? '+' : ''}{crypto.change24h.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </Card>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyScreen;