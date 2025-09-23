import React from 'react';
import Card from '../ui/Card';

interface PriceChartProps {
  symbol: string;
  price: number;
  change24h: number;
}

const PriceChart: React.FC<PriceChartProps> = ({ symbol, price, change24h }) => {
  const isPositive = change24h >= 0;

  // Generate mock chart data
  const generateChartPath = () => {
    const points = Array.from({ length: 20 }, (_, i) => {
      const x = (i / 19) * 300;
      const y = 80 + Math.sin(i * 0.5) * 20 + (Math.random() - 0.5) * 10;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg">{symbol}</h3>
          <p className="text-2xl font-bold text-white">₡{price.toFixed(2)}</p>
        </div>
        <div className={`text-right ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          <p className="text-lg font-semibold">
            {isPositive ? '+' : ''}{change24h.toFixed(2)}%
          </p>
          <p className="text-sm">₡{price.toFixed(2)}</p>
        </div>
      </div>

      <div className="h-24 relative overflow-hidden rounded-lg bg-gray-900/30">
        <svg
          className="w-full h-full"
          viewBox="0 0 300 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`${generateChartPath()} L 300,120 L 0,120 Z`}
            fill="url(#chartGradient)"
          />
          <path
            d={generateChartPath()}
            stroke={isPositive ? "#10B981" : "#EF4444"}
            strokeWidth="2"
            fill="none"
            className="drop-shadow-sm"
          />
          {/* Data points */}
          {Array.from({ length: 5 }, (_, i) => (
            <circle
              key={i}
              cx={75 + i * 37.5}
              cy={80 + Math.sin(i * 2) * 15}
              r="3"
              fill={isPositive ? "#10B981" : "#EF4444"}
              className="animate-pulse"
            />
          ))}
        </svg>
      </div>
    </Card>
  );
};

export default PriceChart;