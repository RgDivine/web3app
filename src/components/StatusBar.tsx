import React from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

const StatusBar: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  });

  return (
    <div className="flex justify-between items-center px-6 py-2 text-white text-sm font-medium">
      <span>{currentTime}</span>
      <div className="flex items-center space-x-1">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Battery className="w-4 h-4" />
      </div>
    </div>
  );
};

export default StatusBar;