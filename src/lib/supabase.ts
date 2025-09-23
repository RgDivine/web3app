import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          phone?: string;
          name: string;
          wallet_address: string;
          qr_code: string;
          avatar?: string;
          two_factor_enabled: boolean;
          biometric_enabled: boolean;
          preferences: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          phone?: string;
          name: string;
          wallet_address: string;
          qr_code: string;
          avatar?: string;
          two_factor_enabled?: boolean;
          biometric_enabled?: boolean;
          preferences?: any;
        };
        Update: {
          email?: string;
          phone?: string;
          name?: string;
          avatar?: string;
          two_factor_enabled?: boolean;
          biometric_enabled?: boolean;
          preferences?: any;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          asset: string;
          amount: number;
          value_usd: number;
          status: string;
          tx_hash?: string;
          fee?: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          type: string;
          asset: string;
          amount: number;
          value_usd: number;
          status: string;
          tx_hash?: string;
          fee?: number;
        };
        Update: {
          status?: string;
          tx_hash?: string;
        };
      };
      payment_methods: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          name: string;
          last4?: string;
          expiry_date?: string;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          type: string;
          name: string;
          last4?: string;
          expiry_date?: string;
          is_default?: boolean;
        };
        Update: {
          name?: string;
          is_default?: boolean;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          read: boolean;
          action_url?: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          message: string;
          type: string;
          read?: boolean;
          action_url?: string;
        };
        Update: {
          read?: boolean;
        };
      };
    };
  };
}