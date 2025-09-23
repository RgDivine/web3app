export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  balance: number;
  valueUsd: number;
  image?: string;
  marketCap?: number;
  volume24h?: number;
  rank?: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'send' | 'receive';
  asset: string;
  amount: number;
  valueUsd: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  txHash?: string;
  fee?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  walletAddress: string;
  qrCode: string;
  avatar?: string;
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  preferences: UserPreferences;
  paymentMethods: PaymentMethod[];
  createdAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  currency: string;
  notifications: {
    push: boolean;
    email: boolean;
    priceAlerts: boolean;
    transactionUpdates: boolean;
  };
  security: {
    twoFactor: boolean;
    biometric: boolean;
    sessionTimeout: number;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal' | 'apple_pay' | 'google_pay';
  name: string;
  last4?: string;
  expiryDate?: string;
  isDefault: boolean;
}

export interface Portfolio {
  totalBalance: number;
  totalChange24h: number;
  assets: CryptoAsset[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface ChartData {
  timestamp: number;
  price: number;
  volume: number;
}

export interface MarketData {
  symbol: string;
  prices: ChartData[];
  period: '1h' | '24h' | '7d' | '30d' | '1y';
}