import { CryptoAsset, ChartData } from '../types/crypto';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const COINBASE_API = 'https://api.coinbase.com/v2';

export class CryptoApiService {
  // Get top cryptocurrencies
  static async getTopCryptos(limit: number = 100): Promise<CryptoAsset[]> {
    try {
      const response = await fetch(
        `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`
      );
      const data = await response.json();
      
      return data.map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h || 0,
        balance: 0,
        valueUsd: 0,
        image: coin.image,
        marketCap: coin.market_cap,
        volume24h: coin.total_volume,
        rank: coin.market_cap_rank
      }));
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      return this.getMockCryptos();
    }
  }

  // Get historical price data
  static async getChartData(coinId: string, days: number = 7): Promise<ChartData[]> {
    try {
      const response = await fetch(
        `${COINGECKO_API}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${days > 1 ? 'daily' : 'hourly'}`
      );
      const data = await response.json();
      
      return data.prices.map(([timestamp, price]: [number, number]) => ({
        timestamp,
        price,
        volume: 0
      }));
    } catch (error) {
      console.error('Error fetching chart data:', error);
      return this.getMockChartData();
    }
  }

  // Get single crypto price
  static async getCryptoPrice(symbol: string): Promise<number> {
    try {
      const response = await fetch(
        `${COINGECKO_API}/simple/price?ids=${symbol}&vs_currencies=usd`
      );
      const data = await response.json();
      return data[symbol]?.usd || 0;
    } catch (error) {
      console.error('Error fetching price:', error);
      return 0;
    }
  }

  // Search cryptocurrencies
  static async searchCryptos(query: string): Promise<CryptoAsset[]> {
    try {
      const response = await fetch(
        `${COINGECKO_API}/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      
      return data.coins.slice(0, 10).map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: 0,
        change24h: 0,
        balance: 0,
        valueUsd: 0,
        image: coin.large,
        rank: coin.market_cap_rank
      }));
    } catch (error) {
      console.error('Error searching cryptos:', error);
      return [];
    }
  }

  // Mock data fallbacks
  private static getMockCryptos(): CryptoAsset[] {
    return [
      {
        id: 'bitcoin',
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 45234.56,
        change24h: 2.34,
        balance: 0,
        valueUsd: 0,
        rank: 1
      },
      {
        id: 'ethereum',
        symbol: 'ETH',
        name: 'Ethereum',
        price: 2834.12,
        change24h: -1.45,
        balance: 0,
        valueUsd: 0,
        rank: 2
      },
      {
        id: 'solana',
        symbol: 'SOL',
        name: 'Solana',
        price: 98.76,
        change24h: 5.67,
        balance: 0,
        valueUsd: 0,
        rank: 5
      }
    ];
  }

  private static getMockChartData(): ChartData[] {
    const now = Date.now();
    return Array.from({ length: 24 }, (_, i) => ({
      timestamp: now - (23 - i) * 3600000,
      price: 45000 + Math.random() * 5000,
      volume: Math.random() * 1000000
    }));
  }
}