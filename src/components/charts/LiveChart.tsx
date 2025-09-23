import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartData } from '../../types/crypto';
import { CryptoApiService } from '../../services/cryptoApi';

interface LiveChartProps {
  symbol: string;
  coinId: string;
  period: '1h' | '24h' | '7d' | '30d' | '1y';
  className?: string;
}

const LiveChart: React.FC<LiveChartProps> = ({ symbol, coinId, period, className = '' }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadChartData();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      loadChartData();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [coinId, period]);

  const loadChartData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const days = getDaysFromPeriod(period);
      const data = await CryptoApiService.getChartData(coinId, days);
      
      setChartData(data);
    } catch (err) {
      setError('Failed to load chart data');
      console.error('Chart data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDaysFromPeriod = (period: string): number => {
    switch (period) {
      case '1h':
        return 1;
      case '24h':
        return 1;
      case '7d':
        return 7;
      case '30d':
        return 30;
      case '1y':
        return 365;
      default:
        return 7;
    }
  };

  const formatXAxisLabel = (timestamp: number) => {
    const date = new Date(timestamp);
    switch (period) {
      case '1h':
      case '24h':
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      case '7d':
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      case '30d':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case '1y':
        return date.toLocaleDateString('en-US', { month: 'short' });
      default:
        return date.toLocaleDateString();
    }
  };

  const formatTooltipValue = (value: number) => {
    return `$${value.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: value < 1 ? 6 : 2 
    })}`;
  };

  const isPositiveTrend = chartData.length > 1 && 
    chartData[chartData.length - 1].price > chartData[0].price;

  if (loading) {
    return (
      <div className={`h-64 flex items-center justify-center ${className}`}>
        <div className="animate-pulse space-y-2 w-full">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`h-64 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-red-400 mb-2">{error}</p>
          <button
            onClick={loadChartData}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="timestamp"
              tickFormatter={formatXAxisLabel}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              domain={['dataMin', 'dataMax']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
              formatter={(value: number) => [formatTooltipValue(value), symbol]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isPositiveTrend ? '#10B981' : '#EF4444'}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: isPositiveTrend ? '#10B981' : '#EF4444' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Live indicator */}
      <div className="flex items-center justify-center mt-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs font-medium">Live</span>
        </div>
      </div>
    </div>
  );
};

export default LiveChart;