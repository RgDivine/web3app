import React, { useState } from 'react';
import { ArrowLeft, Plus, CreditCard, Building, Smartphone } from 'lucide-react';
import StatusBar from '../StatusBar';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { PaymentMethod } from '../../types/crypto';

interface PaymentOptionsScreenProps {
  onBack: () => void;
  onAddPaymentMethod: () => void;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
}

const PaymentOptionsScreen: React.FC<PaymentOptionsScreenProps> = ({
  onBack,
  onAddPaymentMethod,
  onSelectPaymentMethod
}) => {
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa ending in 4242',
      last4: '4242',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'bank',
      name: 'Chase Bank',
      isDefault: false
    },
    {
      id: '3',
      type: 'apple_pay',
      name: 'Apple Pay',
      isDefault: false
    }
  ]);

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-6 h-6" />;
      case 'bank':
        return <Building className="w-6 h-6" />;
      case 'apple_pay':
      case 'google_pay':
        return <Smartphone className="w-6 h-6" />;
      default:
        return <CreditCard className="w-6 h-6" />;
    }
  };

  const getPaymentColor = (type: string) => {
    switch (type) {
      case 'card':
        return 'from-blue-600 to-purple-600';
      case 'bank':
        return 'from-green-600 to-teal-600';
      case 'apple_pay':
        return 'from-gray-600 to-gray-800';
      case 'google_pay':
        return 'from-red-600 to-orange-600';
      default:
        return 'from-purple-600 to-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-semibold text-white">Payment Methods</h1>
        <button
          onClick={onAddPaymentMethod}
          className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="px-6 space-y-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-white mb-2">Choose Payment Method</h2>
          <p className="text-gray-400">Select how you'd like to fund your crypto purchases</p>
        </div>

        {/* Coinbase Integration Notice */}
        <Card className="p-4 bg-blue-500/20 border-blue-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">CB</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">Powered by Coinbase</h3>
              <p className="text-blue-200 text-sm">Secure payments with industry-leading security</p>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-lg">Your Payment Methods</h3>
          
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => onSelectPaymentMethod(method)}
              className="w-full"
            >
              <Card className="p-4 hover:bg-gray-700/30 transition-all active:scale-98" hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getPaymentColor(method.type)} flex items-center justify-center text-white`}>
                      {getPaymentIcon(method.type)}
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-semibold">{method.name}</h4>
                      {method.expiryDate && (
                        <p className="text-gray-400 text-sm">Expires {method.expiryDate}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.isDefault && (
                      <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </Card>
            </button>
          ))}

          {/* Add New Payment Method */}
          <button
            onClick={onAddPaymentMethod}
            className="w-full"
          >
            <Card className="p-4 border-dashed border-gray-600 hover:border-purple-500 hover:bg-purple-500/10 transition-all active:scale-98">
              <div className="flex items-center justify-center space-x-3 py-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Add Payment Method</h4>
                  <p className="text-gray-400 text-sm">Credit card, bank account, or digital wallet</p>
                </div>
              </div>
            </Card>
          </button>
        </div>

        {/* Security Notice */}
        <Card className="p-4 bg-gray-800/50">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">🔒 Bank-Level Security</h4>
            <p className="text-gray-400 text-sm">
              Your payment information is encrypted and stored securely. We never store your full card details.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentOptionsScreen;