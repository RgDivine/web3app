import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import StatusBar from '../StatusBar';

interface AuthScreenProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onSignIn, onSignUp }) => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      <StatusBar />
      
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">₿</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              CryptoTrade Pro
            </h1>
            <p className="text-gray-300">
              Professional cryptocurrency trading platform for busy professionals
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={onSignUp}
              className="w-full"
              size="lg"
            >
              Create Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              onClick={onSignIn}
              variant="secondary"
              className="w-full"
              size="lg"
            >
              Sign In
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              By continuing, you agree to our{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-white">500K+</div>
              <div className="text-gray-400 text-sm">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">$2.5B+</div>
              <div className="text-gray-400 text-sm">Volume Traded</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-4">
        <div className="w-32 h-1 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default AuthScreen;