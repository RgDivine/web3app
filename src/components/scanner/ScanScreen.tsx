import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, Image, Flashlight } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import StatusBar from '../StatusBar';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface ScanScreenProps {
  onBack: () => void;
  onScanResult: (result: string) => void;
}

const ScanScreen: React.FC<ScanScreenProps> = ({ onBack, onScanResult }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setIsScanning(true);
      setError('');
      
      // Check if camera permission is available
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop()); // Stop the test stream
        
        // Initialize QR code scanner
        const scanner = new Html5QrcodeScanner(
          'qr-reader',
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
          },
          false
        );

        scanner.render(
          (decodedText) => {
            setScanResult(decodedText);
            onScanResult(decodedText);
            scanner.clear();
            setIsScanning(false);
          },
          (error) => {
            console.log('QR scan error:', error);
          }
        );

        scannerRef.current = scanner;
      } else {
        throw new Error('Camera not supported on this device');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to access camera');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd process the image to extract QR code
      // For now, we'll simulate a successful scan
      const mockResult = 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.001';
      setScanResult(mockResult);
      onScanResult(mockResult);
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
        <h1 className="text-xl font-semibold text-white">Scan QR Code</h1>
        <button className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors">
          <Flashlight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="px-6 space-y-6">
        {/* Scanner Area */}
        <Card className="p-6 text-center">
          {!isScanning ? (
            <div className="space-y-6">
              <div className="w-32 h-32 mx-auto border-4 border-dashed border-gray-600 rounded-2xl flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg mb-2">Scan QR Code</h2>
                <p className="text-gray-400 text-sm">
                  Position the QR code within the frame to scan wallet addresses or payment requests
                </p>
              </div>
              
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  onClick={startScanning}
                  className="w-full"
                  size="lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Start Camera
                </Button>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button
                    variant="secondary"
                    className="w-full"
                    size="lg"
                  >
                    <Image className="w-5 h-5 mr-2" />
                    Upload from Gallery
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div id="qr-reader" className="w-full"></div>
              <Button
                onClick={stopScanning}
                variant="secondary"
                className="w-full"
              >
                Stop Scanning
              </Button>
            </div>
          )}
        </Card>

        {/* Scan Result */}
        {scanResult && (
          <Card className="p-4 bg-green-500/20 border-green-500/30">
            <div className="space-y-3">
              <h3 className="text-green-400 font-semibold">Scan Successful!</h3>
              <div className="bg-gray-800/50 p-3 rounded-xl">
                <p className="text-white text-sm font-mono break-all">{scanResult}</p>
              </div>
              <Button
                onClick={() => onScanResult(scanResult)}
                className="w-full"
              >
                Use This Address
              </Button>
            </div>
          </Card>
        )}

        {/* Instructions */}
        <Card className="p-4 bg-gray-800/50">
          <h3 className="text-white font-semibold mb-3">How to Scan</h3>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>• Hold your device steady and point the camera at the QR code</p>
            <p>• Make sure the QR code is well-lit and clearly visible</p>
            <p>• The scan will happen automatically when detected</p>
            <p>• You can also upload an image from your gallery</p>
          </div>
        </Card>

        {/* Supported Formats */}
        <Card className="p-4 bg-gray-800/50">
          <h3 className="text-white font-semibold mb-3">Supported Formats</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-gray-400">
              <p>• Bitcoin addresses</p>
              <p>• Ethereum addresses</p>
              <p>• Solana addresses</p>
            </div>
            <div className="text-gray-400">
              <p>• Payment requests</p>
              <p>• Wallet connect</p>
              <p>• Lightning invoices</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ScanScreen;