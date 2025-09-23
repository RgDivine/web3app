import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Fingerprint, Shield } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import StatusBar from '../StatusBar';
import { AuthService } from '../../services/authService';

interface SignInScreenProps {
  onSignIn: (user: any) => void;
  onBack: () => void;
  onForgotPassword: () => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ onSignIn, onBack, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [biometricAvailable] = useState(true); // Mock biometric availability

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await AuthService.signInWithEmail(formData.email, formData.password);
      if (user) {
        onSignIn(user);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      // Mock biometric authentication
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you'd use WebAuthn API or similar
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        walletAddress: 'mock-wallet-address',
        qrCode: 'mock-qr-code'
      };
      
      onSignIn(mockUser);
    } catch (err: any) {
      setError('Biometric authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await AuthService.signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await AuthService.signInWithApple();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Apple');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-semibold text-white">Sign In</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-300">Sign in to continue trading</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              icon={Mail}
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                icon={Lock}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-purple-400 hover:text-purple-300"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={loading}
              size="lg"
            >
              Sign In
            </Button>

            {/* Biometric Authentication */}
            {biometricAvailable && (
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={handleBiometricAuth}
                  loading={loading}
                >
                  <Fingerprint className="w-5 h-5 mr-2" />
                  Touch ID
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={handleBiometricAuth}
                  loading={loading}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Face ID
                </Button>
              </div>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                type="button"
                variant="secondary" 
                className="w-full" 
                size="lg"
                onClick={handleGoogleSignIn}
              >
                <img src="data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z' fill='%234285F4'/%3E%3Cpath d='M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z' fill='%2334A853'/%3E%3Cpath d='M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z' fill='%23FBBC05'/%3E%3Cpath d='M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z' fill='%23EA4335'/%3E%3C/g%3E%3C/svg%3E" alt="Google" className="w-5 h-5 mr-2" />
                Sign in with Google
              </Button>

              <Button 
                type="button"
                variant="secondary" 
                className="w-full" 
                size="lg"
                onClick={handleAppleSignIn}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.11.22.082.339-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.764-1.378l-.77 2.978c-.28 1.085-1.031 2.445-1.535 3.27C9.358 23.77 10.659 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001Z"/>
                </svg>
                Continue with Apple
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-4">
        <div className="w-32 h-1 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default SignInScreen;