import { supabase } from '../lib/supabase';
import { User, UserPreferences } from '../types/crypto';
import { WalletService } from './walletService';

export class AuthService {
  // Sign up with email
  static async signUpWithEmail(email: string, password: string, name: string): Promise<User | null> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        const walletAddress = WalletService.generateWalletAddress();
        const qrCode = await WalletService.generateQRCode(walletAddress);
        
        const defaultPreferences: UserPreferences = {
          theme: 'dark',
          currency: 'USD',
          notifications: {
            push: true,
            email: true,
            priceAlerts: true,
            transactionUpdates: true
          },
          security: {
            twoFactor: false,
            biometric: false,
            sessionTimeout: 30
          }
        };

        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email,
            name,
            wallet_address: walletAddress,
            qr_code: qrCode,
            preferences: defaultPreferences
          });

        if (insertError) throw insertError;

        return {
          id: data.user.id,
          name,
          email,
          walletAddress,
          qrCode,
          twoFactorEnabled: false,
          biometricEnabled: false,
          preferences: defaultPreferences,
          paymentMethods: [],
          createdAt: new Date()
        };
      }

      return null;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  // Sign in with email
  static async signInWithEmail(email: string, password: string): Promise<User | null> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) throw userError;

        return {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          walletAddress: userData.wallet_address,
          qrCode: userData.qr_code,
          avatar: userData.avatar,
          twoFactorEnabled: userData.two_factor_enabled,
          biometricEnabled: userData.biometric_enabled,
          preferences: userData.preferences,
          paymentMethods: [],
          createdAt: new Date(userData.created_at)
        };
      }

      return null;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  // Sign in with Google
  static async signInWithGoogle(): Promise<void> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  // Sign in with Apple
  static async signInWithApple(): Promise<void> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Apple sign in error:', error);
      throw error;
    }
  }

  // Sign out
  static async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        walletAddress: userData.wallet_address,
        qrCode: userData.qr_code,
        avatar: userData.avatar,
        twoFactorEnabled: userData.two_factor_enabled,
        biometricEnabled: userData.biometric_enabled,
        preferences: userData.preferences,
        paymentMethods: [],
        createdAt: new Date(userData.created_at)
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }
}