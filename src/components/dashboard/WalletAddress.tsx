import React, { useState } from 'react';
import { Copy, Send, QrCode } from 'lucide-react';
import Card from '../ui/Card';

interface WalletAddressProps {
  address: string;
  onSend: () => void;
}

const WalletAddress: React.FC<WalletAddressProps> = ({ address, onSend }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  };

  return (
    <Card className="p-4">
      <p className="text-gray-400 text-sm mb-2">Your address</p>
      <div className="flex items-center justify-between">
        <span className="text-white font-mono text-lg">
          {formatAddress(address)}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={onSend}
            className="p-2 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all">
            <QrCode className="w-5 h-5" />
          </button>
        </div>
      </div>
      {copied && (
        <p className="text-green-400 text-sm mt-2">Address copied!</p>
      )}
    </Card>
  );
};

export default WalletAddress;